package org.algorithm.algorithm.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.config.StorageProperties;
import org.algorithm.algorithm.dto.BoardDTO;
import org.algorithm.algorithm.dto.ResponseUserDTO;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.entity.*;
import org.algorithm.algorithm.exception.*;
import org.algorithm.algorithm.repository.*;
import org.apache.coyote.BadRequestException;
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
public class RecommendService {

    public final RankingRepository rankingRepository;
    public final ResponseUserRepository responseUserRepository;
    public final UserProfileRepository userProfileRepository;
    public final UserTryRepository userTryRepository;
    public final BoardRepository boardRepository;
    public final CommentRepository commentRepository;
    public final CommentCodeRepository commentCodeRepository;
    public final RecommendBoardRepository recommendBoardRepository;
    public final RecommendCommentRepository recommendCommentRepository;
    public final RecommendCommentCodeRepository recommendCommentCodeRepository;

    public ObjectNode postBoardRecommend(Long boardId,Boolean value, UserDTO userDTO) {
        try {
            BoardEntity boardEntity = boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(boardId);
            if(boardEntity == null)
                throw new NotFoundException("Board Not Found ! Recommend Error");
            if(recommendBoardRepository.findByBoardIdAndUserId(boardId, userDTO.getUserId()) != null)
                throw new DuplicatedExcepiton("Already Exist Recommend ! ");

            RecommendBoardEntity recommendBoardEntity = new RecommendBoardEntity();
            recommendBoardEntity.setBoardId(boardEntity.getBoardId());
            recommendBoardEntity.setUserId(userDTO.getUserId());
            recommendBoardEntity.setValue(value ? 1 : -1);
            RecommendBoardEntity savedEntity = recommendBoardRepository.save(recommendBoardEntity);

            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode resultNode = objectMapper.createObjectNode();
            resultNode.put("recommendBoardId",savedEntity.getRecommendBoardId());
            resultNode.put("userId",savedEntity.getUserId());
            resultNode.put("boardId",savedEntity.getBoardId());
            resultNode.put("value",savedEntity.getValue());

            return resultNode;
        } catch (Exception e) {
            throw e;
        }
    }

    public ObjectNode postCommentRecommend(Long commentId,Boolean value, UserDTO userDTO) {
        try {
            CommentEntity commentEntity = commentRepository.findByCommentId(commentId);
            if(commentEntity == null)
                throw new NotFoundException("Comment Not Found ! Recommend Error");
            if(recommendCommentRepository.findByCommentIdAndUserId(commentId, userDTO.getUserId()) != null)
                throw new DuplicatedExcepiton("Already Exist Recommend ! ");

            RecommendCommentEntity recommendCommentEntity = new RecommendCommentEntity();
            recommendCommentEntity.setCommentId(commentEntity.getCommentId());
            recommendCommentEntity.setUserId(userDTO.getUserId());
            recommendCommentEntity.setValue(value ? 1 : -1);
            RecommendCommentEntity savedEntity = recommendCommentRepository.save(recommendCommentEntity);

            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode resultNode = objectMapper.createObjectNode();
            resultNode.put("recommendCommentId",savedEntity.getRecommendCommentId());
            resultNode.put("userId",savedEntity.getUserId());
            resultNode.put("comment",savedEntity.getCommentId());
            resultNode.put("value",savedEntity.getValue());

            return resultNode;
        } catch (Exception e) {
            throw e;
        }
    }

    public ObjectNode postCommentCodeRecommend(Long commentCodeId,Boolean value, UserDTO userDTO) {
        try {
            CommentCodeEntity commentCodeEntity = commentCodeRepository.findByCommentCodeId(commentCodeId);
            if(commentCodeEntity == null)
                throw new NotFoundException("CommentCode Not Found ! Recommend Error");
            if(recommendCommentCodeRepository.findByCommentCodeIdAndUserId(commentCodeId, userDTO.getUserId()) != null)
                throw new DuplicatedExcepiton("Already Exist Recommend ! ");

            RecommendCommentCodeEntity recommendCommentCodeEntity = new RecommendCommentCodeEntity();
            recommendCommentCodeEntity.setCommentCodeId(commentCodeEntity.getCommentCodeId());
            recommendCommentCodeEntity.setUserId(userDTO.getUserId());
            recommendCommentCodeEntity.setValue(value ? 1 : -1);
            RecommendCommentCodeEntity savedEntity = recommendCommentCodeRepository.save(recommendCommentCodeEntity);

            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode resultNode = objectMapper.createObjectNode();
            resultNode.put("recommedCommentCodeId",savedEntity.getRecommendCommentCodeId());
            resultNode.put("userId",savedEntity.getUserId());
            resultNode.put("commentCodeId",savedEntity.getCommentCodeId());
            resultNode.put("value",savedEntity.getValue());

            return resultNode;
        } catch (Exception e) {
            throw e;
        }
    }

    public HttpStatus deleteBoard(Long boardId, UserDTO userDTO) {
        try {
            // 추천 엔티티 검색
            RecommendBoardEntity recommendBoardEntity = recommendBoardRepository.findByBoardIdAndUserId(boardId, userDTO.getUserId());

            // 해당 추천 없으면 NotFoundException 발생
            if (recommendBoardEntity == null)
                throw new NotFoundException("Not Found Recommend. ");

            // 유저 확인 (옵션: 댓글 작성자와 현재 유저가 같은지 확인)
            if (!(recommendBoardEntity.getUserId() == userDTO.getUserId()))
                throw new BadRequestException("User not authorized to delete this recommend");

            // 댓글 삭제
            recommendBoardRepository.delete(recommendBoardEntity);

            return HttpStatus.OK;

        }
        catch (NotFoundException | AuthorizedException e){
            throw e;
        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to delete board.");
        }
    }

    public HttpStatus deleteComment(Long commentId, UserDTO userDTO) {
        try {
            // 추천 엔티티 검색
            RecommendCommentEntity recommendCommentEntity = recommendCommentRepository.findByCommentIdAndUserId(commentId, userDTO.getUserId());

            // 해당 추천 없으면 NotFoundException 발생
            if (recommendCommentEntity == null)
                throw new NotFoundException("Not Found Recommend. ");

            // 유저 확인 (옵션: 댓글 작성자와 현재 유저가 같은지 확인)
            if (!(recommendCommentEntity.getUserId() == userDTO.getUserId()))
                throw new BadRequestException("User not authorized to delete this recommend");

            // 댓글 삭제
            recommendCommentRepository.delete(recommendCommentEntity);

            return HttpStatus.OK;

        }
        catch (NotFoundException | AuthorizedException e){
            throw e;
        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to delete board.");
        }
    }

    public HttpStatus deleteCommentCode(Long commentCodeId, UserDTO userDTO) {
        try {
            // 추천 엔티티 검색
            RecommendCommentCodeEntity recommendCommentCodeEntity = recommendCommentCodeRepository.findByCommentCodeIdAndUserId(commentCodeId, userDTO.getUserId());

            // 해당 추천 없으면 NotFoundException 발생
            if (recommendCommentCodeEntity == null)
                throw new NotFoundException("Not Found Recommend. ");

            // 유저 확인 (옵션: 댓글 작성자와 현재 유저가 같은지 확인)
            if (!(recommendCommentCodeEntity.getUserId() == userDTO.getUserId()))
                throw new BadRequestException("User not authorized to delete this recommend");

            // 댓글 삭제
            recommendCommentCodeRepository.delete(recommendCommentCodeEntity);

            return HttpStatus.OK;

        }
        catch (NotFoundException | AuthorizedException e){
            throw e;
        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to delete board.");
        }
    }

}