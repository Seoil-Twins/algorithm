package org.algorithm.algorithm.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.config.StorageProperties;
import org.algorithm.algorithm.dto.*;
import org.algorithm.algorithm.entity.*;
import org.algorithm.algorithm.exception.DuplicatedExcepiton;
import org.algorithm.algorithm.exception.NotFoundException;
import org.algorithm.algorithm.exception.SQLException;
import org.algorithm.algorithm.exception.StorageException;
import org.algorithm.algorithm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    public final ResponseUserRepository responseUserRepository;
    public final UserProfileRepository userProfileRepository;
    public final UserTryRepository userTryRepository;
    public final FavoriteRepository favoriteRepository;

    public final AlgorithmRepository algorithmRepository;
    public final BoardRepository boardRepository;
    public final CommentRepository commentRepository;
    public final CodeRepository codeRepository;

    public final BoardService boardService;
    public final AlgorithmService algorithmService;
    public final CodeService codeService;

    public final RecommendCommentRepository recommendCommentRepository;

    public ObjectNode getFavorites(int page, int count) {
        try {
            Pageable pageable = PageRequest.of(page-1, count);
            Page<FavoriteEntity> favoriteEntities =  favoriteRepository.findAll(pageable);


            // 랭킹을  찾지 못하면 오류 반환
            if (favoriteEntities == null) {
                throw new NotFoundException("Favorite Not Found ! ");
            }

            List<FavoriteEntity> resultValue = favoriteEntities.getContent();
            List<ObjectNode> responseList = new ArrayList<>();

            for (FavoriteEntity favoriteEntity : resultValue) {
                ObjectNode favoriteNode = createFavoriteNode(favoriteEntity);
                responseList.add(favoriteNode);
            }

            return createResultNode(responseList);

        }
        catch(NotFoundException e){
            throw e;
        }
        catch(Error e){
            throw new SQLException("Ranking SQL Error ! ");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public Boolean getIsFavoriteBoard(Long boardId, UserDTO userDTO) {
        try {
            FavoriteEntity favoriteEntity =  favoriteRepository.findFavoriteEntityByTargetIdAndTargetTypeAndUserId(boardId,1L,userDTO.getUserId());
            return favoriteEntity != null;
        }
        catch(Exception e){
            throw new SQLException("getFavorites SQL Error ! ");
        }
    }

    public Boolean getIsFavoriteAlgorithm(Long boardId, UserDTO userDTO) {
        try {
            FavoriteEntity favoriteEntity =  favoriteRepository.findFavoriteEntityByTargetIdAndTargetTypeAndUserId(boardId,2L,userDTO.getUserId());
            return favoriteEntity != null;
        }
        catch(Exception e){
            throw new SQLException("getFavorites SQL Error ! ");
        }
    }

    public Boolean getIsFavoriteComment(Long boardId, UserDTO userDTO) {
        try {
            FavoriteEntity favoriteEntity =  favoriteRepository.findFavoriteEntityByTargetIdAndTargetTypeAndUserId(boardId,3L,userDTO.getUserId());
            return favoriteEntity != null;
        }
        catch(Exception e){
            throw new SQLException("getFavorites SQL Error ! ");
        }
    }

    public Boolean getIsFavoriteCode(Long boardId, UserDTO userDTO) {
        try {
            FavoriteEntity favoriteEntity =  favoriteRepository.findFavoriteEntityByTargetIdAndTargetTypeAndUserId(boardId,4L,userDTO.getUserId());
            return favoriteEntity != null;
        }
        catch(Exception e){
            throw new SQLException("getFavorites SQL Error ! ");
        }
    }

    public HttpStatus postFavorite(Long algorithmId, UserDTO userDTO) {
        try {
            FavoriteEntity favoriteEntity =  favoriteRepository.findFavoriteEntityByTargetIdAndTargetTypeAndUserId(algorithmId,2L,userDTO.getUserId());
            // 랭킹을  찾지 못하면 오류 반환
            if (favoriteEntity != null) {
                throw new DuplicatedExcepiton("Favorite Exist ! ");
            }

            FavoriteEntity saveEntity = new FavoriteEntity();
            saveEntity.setUserId(userDTO.getUserId());
            saveEntity.setCreatedTime(LocalDateTime.now());
            saveEntity.setTargetId(algorithmId);
            saveEntity.setTargetType(2);
            favoriteRepository.save(saveEntity);

            return HttpStatus.CREATED;

        }
        catch(DuplicatedExcepiton e){
            throw e;
        }
        catch(Exception e){
            throw new SQLException("postFavorites SQL Error ! ");
        }
    }

    public HttpStatus deleteFavorite(Long algorithmId, UserDTO userDTO) {
        try {
            FavoriteEntity favoriteEntity =  favoriteRepository.findFavoriteEntityByTargetIdAndTargetTypeAndUserId(algorithmId,2L,userDTO.getUserId());
            // 랭킹을  찾지 못하면 오류 반환
            if (favoriteEntity == null) {
                throw new NotFoundException("Favorite NOT FOUND ! ");
            }
            favoriteRepository.delete(favoriteEntity);

            return HttpStatus.OK;

        }
        catch(NotFoundException e){
            throw e;
        }
        catch(Exception e){
            throw new SQLException("postFavorites SQL Error ! ");
        }
    }


    private ObjectNode createFavoriteNode(FavoriteEntity favoriteEntity) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode rankingNode = objectMapper.createObjectNode();

        // userId로 user data 가져와서 node 생성
        ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(favoriteEntity.getUserId());
        ResponseUserDTO responseUserDTO = ResponseUserDTO.toResponseUserDTO(userEntity);

        UserProfileEntity userProfileEntity = userProfileRepository.findUserProfileEntityByUserId(responseUserDTO.getUserId());
        String profile;

        if (userProfileEntity == null) {
            profile = null;
        } else {
            profile = userProfileEntity.getPath();
        }

        ObjectNode userNode = objectMapper.createObjectNode();
        userNode.put("userId", responseUserDTO.getUserId());
        userNode.put("profile", profile);
        userNode.put("nickname", responseUserDTO.getNickname());




        rankingNode.put("favoriteId", favoriteEntity.getFavoriteId());
        rankingNode.set("user", userNode);
        rankingNode.put("createdTime", String.valueOf(favoriteEntity.getCreatedTime()));
        if(favoriteEntity.getTargetType() == 1) {
            ObjectNode boardNode = objectMapper.createObjectNode();

            BoardEntity boardEntity = boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(favoriteEntity.getTargetId());

            if(boardEntity == null)
                throw new NotFoundException("Favorite : Not Found Board");

            BoardDTO boardDTO = BoardDTO.toBoardDTO(boardEntity);

            boardNode = boardService.createBoardNode(boardDTO, favoriteEntity.getUserId());

            rankingNode.set("board", boardNode);
        }
        if(favoriteEntity.getTargetType() == 2) {
            ObjectNode algorithmNode = algorithmService.getOneAlgorithm(favoriteEntity.getTargetId(), favoriteEntity.getUserId());

            rankingNode.set("algorithm", algorithmNode);
        }
        if(favoriteEntity.getTargetType() == 3) {
            CommentEntity commentEntity = commentRepository.findByCommentId(favoriteEntity.getTargetId());

            if(commentEntity == null)
                throw new NotFoundException("Favorite : Not Found Comment");

            CommentDTO commentDTO = CommentDTO.toCommentDTO(commentEntity);
            ObjectNode commentNode = objectMapper.createObjectNode();

            String recommend = recommendCommentRepository.countByCommentId(commentDTO.getCommentId());
            if(recommend == null)
                recommend = "0";

            // userId로 user data 가져와서 node 생성
            ResponseUserEntity userEntity2 = responseUserRepository.findDefaultByUserId(commentDTO.getUserId());
            ResponseUserDTO responseUserDTO2 = ResponseUserDTO.toResponseUserDTO(userEntity2);

            UserProfileEntity userProfileEntity2 = userProfileRepository.findUserProfileEntityByUserId(responseUserDTO2.getUserId());
            String profile2;

            if (userProfileEntity2 == null) {
                profile2 = null;
            } else {
                profile2 = userProfileEntity2.getPath();
            }

            ObjectNode userNode2 = objectMapper.createObjectNode();
            userNode2.put("userId", responseUserDTO2.getUserId());
            userNode2.put("profile", profile2);
            userNode2.put("nickname", responseUserDTO2.getNickname());

            commentNode.put("commentId",commentDTO.getCommentId());
            commentNode.set("user",userNode2);
            commentNode.put("content",commentDTO.getContent());
            commentNode.put("recommendCount",recommend);
            commentNode.put("createdTime", String.valueOf(commentDTO.getCreatedTime()));

            rankingNode.set("comment", commentNode);
        }
        if(favoriteEntity.getTargetType() == 4) {
            ObjectNode codeNode = objectMapper.createObjectNode();

            CodeEntity codeEntity = codeRepository.findCodeEntityByCodeId(favoriteEntity.getTargetId());

            if(codeEntity == null)
                throw new NotFoundException("Favorite : Not Found Code");

            CodeDTO codeDTO = CodeDTO.toCodeDTO(codeEntity);

            codeNode = codeService.createCodeNode(codeDTO);

            rankingNode.set("code", codeNode);
        }
        return rankingNode;
    }

    private ObjectNode createResultNode(List<ObjectNode> responseList) {
        ObjectMapper objectMapper = new ObjectMapper();
        ArrayNode codesArrayNode = objectMapper.createArrayNode();

        for (ObjectNode node : responseList) {
            codesArrayNode.add(node);
        }

        ObjectNode resultNode = objectMapper.createObjectNode();
        resultNode.set("favorites", codesArrayNode);
        resultNode.put("total", responseList.size());

        return resultNode;
    }
}