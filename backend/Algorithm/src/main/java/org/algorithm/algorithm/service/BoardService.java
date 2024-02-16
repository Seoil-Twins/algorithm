package org.algorithm.algorithm.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.*;
import org.algorithm.algorithm.entity.*;
import org.algorithm.algorithm.exception.GlobalException;
import org.algorithm.algorithm.exception.SQLException;
import org.algorithm.algorithm.repository.*;
import org.algorithm.algorithm.util.AlgorithmSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BoardService {

    public final AlgorithmRepository algorithmRepository;
    public final AlgorithmKindRepository algorithmKindRepository;
    public final BoardRepository boardRepository;
    public final ExplanationRepository explanationRepository;
    public final ResponseUserRepository responseUserRepository;
    public final UserRepository userRepository;
    public final UserProfileRepository userProfileRepository;
    public final TestcaseRepository testcaseRepository;
    public final FavoriteRepository favoriteRepository;
    public final RecommendBoardRepository recommendBoardRepository;
    public final BoardViewRepository boardViewRepository;
    public final AdoptRepository adoptRepository;
    public final AdoptFeedbackRepository adoptFeedbackRepository;
    public final TagRepository tagRepository;
    public final CommentRepository commentRepository;
    public final RecommendCommentRepository recommendCommentRepository;


    public ObjectNode getAll(int page, int count, Long boardType, UserDTO userDTO) {
        try {
            Pageable pageable = PageRequest.of(page-1, count);
            Page<BoardEntity> boardEntities = null;

            if(boardType == 0)
            {
                List<Long> boardTypes = new ArrayList<>();
                boardTypes.add(1L);
                boardTypes.add(2L);
                boardTypes.add(3L);
                boardTypes.add(4L);
                boardEntities = boardRepository.findBoardEntitiesByBoardTypeIn(pageable, boardTypes);
            }
            else if(boardType == 5)
            {
                List<Long> boardTypes = new ArrayList<>();
                boardTypes.add(1L);
                boardTypes.add(2L);
                boardEntities = boardRepository.findBoardEntitiesByBoardTypeIn(pageable, boardTypes);
            }
            else if(boardType == 6)
            {
                List<Long> boardTypes = new ArrayList<>();
                boardTypes.add(3L);
                boardTypes.add(4L);
                boardEntities = boardRepository.findBoardEntitiesByBoardTypeIn(pageable, boardTypes);
            }
            else {
                boardEntities = boardRepository.findBoardEntitiesByBoardType(pageable, boardType);
            }

            List<BoardEntity> resultValue = boardEntities.getContent();
            List<ObjectNode> responseList = new ArrayList<>();

            for (BoardEntity boardEntity : resultValue) {
                BoardDTO boardDTO = BoardDTO.toBoardDTO(boardEntity);
                ObjectNode boardNode = null;
                if(userDTO != null)
                    boardNode = createBoardNode(boardDTO, userDTO);
                else
                    boardNode = createBoardNode(boardDTO);
                responseList.add(boardNode);
            }

            return createResultNode(responseList);
        }
        catch (Exception e){
            throw new SQLException(" Board Get All SQL Error ! ");
        }
    }

    public ObjectNode getBoardDetail(int boardId, UserDTO userDTO) {
        try {
            BoardEntity boardEntity = boardRepository.findBoardEntityByBoardId(boardId);


            BoardDTO boardDTO = BoardDTO.toBoardDTO(boardEntity);
            ObjectNode boardNode = null;
            if(userDTO != null)
                boardNode = createBoardNode(boardDTO, userDTO);
            else
                boardNode = createBoardNode(boardDTO);

            boardNode.put("comments",insertCommentsNode(boardDTO));
            if(Objects.equals(boardNode.get("solved").toString(), "true")){
                if(boardDTO.getBoardType() != 4L)
                    boardNode.put("solved",adoptRepository.findCommentIdByBoardId(boardId));
            }

            return boardNode;
        }
        catch (Exception e){
            throw new SQLException(" Board Detail Get All SQL Error ! ");
        }
    }

    public ObjectNode getRecommended(UserDTO userDTO) {
        try {
            List<BoardEntity> resultValue = boardRepository.findRecommendedBoardEntities();
            List<ObjectNode> responseList = new ArrayList<>();

            for (BoardEntity boardEntity : resultValue) {
                BoardDTO boardDTO = BoardDTO.toBoardDTO(boardEntity);
                ObjectNode boardNode = null;
                if(userDTO != null)
                    boardNode = createBoardNode(boardDTO, userDTO);
                else
                    boardNode = createBoardNode(boardDTO);
                responseList.add(boardNode);
            }

            return createResultNode(responseList);
        }
        catch (Exception e){
            throw new SQLException(" Board Recommended Get All SQL Error ! ");
        }
    }

    public ObjectNode getComments(long boardId, UserDTO userDTO) {
        try {
           ObjectMapper objectMapper = new ObjectMapper();
           ObjectNode commentNode = objectMapper.createObjectNode();

           BoardEntity boardEntity = boardRepository.findBoardEntityByBoardId(boardId);
           BoardDTO boardDTO = BoardDTO.toBoardDTO(boardEntity);
           ArrayNode commentList = insertCommentsNode(boardDTO);

           commentNode.set("comments", commentList);
           commentNode.put("total",commentList.size());

            return commentNode;
        }
        catch (Exception e){
            throw new SQLException(" Board Recommended Get All SQL Error ! ");
        }
    }

    public ObjectNode getBoardByAlgorithmId(int page, int count, Long algorithmId, Long boardType, UserDTO userDTO) {
        try {
            Pageable pageable = PageRequest.of(page-1, count);
            Page<BoardEntity> boardEntities = null;

            if(boardType == 6)
            {
                List<Long> boardTypes = new ArrayList<>();
                boardTypes.add(3L);
                boardTypes.add(4L);
                boardEntities = boardRepository.findBoardEntitiesByBoardTypeInAndAlgorithmId(pageable, boardTypes, algorithmId);
            }
            else {
                boardEntities = boardRepository.findBoardEntitiesByBoardTypeAndAlgorithmId(pageable, boardType, algorithmId);
            }

            List<BoardEntity> resultValue = boardEntities.getContent();
            List<ObjectNode> responseList = new ArrayList<>();

            for (BoardEntity boardEntity : resultValue) {
                BoardDTO boardDTO = BoardDTO.toBoardDTO(boardEntity);
                ObjectNode boardNode = null;
                if(userDTO != null)
                    boardNode = createBoardNode(boardDTO, userDTO);
                else
                    boardNode = createBoardNode(boardDTO);
                responseList.add(boardNode);
            }

            return createResultNode(responseList);
        }
        catch (Exception e){
            throw new SQLException(" Board Algorithm All SQL Error ! ");
        }
    }
    private ObjectNode createBoardNode(BoardDTO boardDTO, UserDTO userDTO) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode boardNode = objectMapper.createObjectNode();
        Set<Long> validSolved = new HashSet<>(Arrays.asList(1L,3L,4L));
        Set<Long> feedbackSolved = new HashSet<>(Arrays.asList(4L));

        // userId로 user data 가져와서 node 생성
        ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(boardDTO.getUserId());
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

        // boardId로 recommendCount 추출
        String recommendCount = recommendBoardRepository.findCountByBoardId(boardDTO.getBoardId());
        if(recommendCount == null)
            recommendCount = "0";

        // boardId로 views 추출 코드
        String views = boardViewRepository.countByBoardId(boardDTO.getBoardId());
        if(views == null)
            views = "0";

        // boardId로 solved 추출 코드 작성 요망
        Boolean solved;
        if(feedbackSolved.contains(boardDTO.getBoardType())) {
            solved = adoptFeedbackRepository.findByBoardId(boardDTO.getBoardId()) != null;
        }
        else
            solved = adoptRepository.findByBoardId(boardDTO.getBoardId()) != null;

        // boardId로 tags 추출 코드 작성 요망
//        String[] tags = ["자유분방","천방지축"];
        List<String> tagList = tagRepository.findValuesByBoardId(boardDTO.getBoardId());

        // boardId로 commentCount 추출 코드 작성 요망
        String commentCount = boardRepository.findCommentCountByBoardId(boardDTO.getBoardId());
        if (commentCount == null)
            commentCount = "0";

//        // boardId로 isRecommend 추출 코드 작성 요망
        Boolean isRecommend = recommendBoardRepository.findByBoardIdAndUserId(boardDTO.getBoardId(),userDTO.getUserId()) != null;
//
//        // boardId로 isView 추출 코드 작성 요망
        Boolean isView = boardViewRepository.findByBoardIdAndUserId(boardDTO.getBoardId(),userDTO.getUserId()) != null;

        boardNode.put("boardId", boardDTO.getBoardId());
        boardNode.put("boardType", boardDTO.getBoardType());
        boardNode.set("user", userNode);
        boardNode.put("title", boardDTO.getTitle());
        boardNode.put("content", boardDTO.getContent());
        if(validSolved.contains(boardDTO.getBoardType()))
            boardNode.put("solved", solved);
        boardNode.put("views", views);
        boardNode.put("recommendCount", recommendCount);
        boardNode.put("tags", tagList.toString());
        boardNode.put("commentCount", commentCount);
        boardNode.put("isRecommend", isRecommend);
        boardNode.put("isView", isView);
        boardNode.put("createdTime", String.valueOf(boardDTO.getCreatedTime()));

        return boardNode;
    }
    private ObjectNode createBoardNode(BoardDTO boardDTO) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode boardNode = objectMapper.createObjectNode();
        Set<Long> validSolved = new HashSet<>(Arrays.asList(1L,3L,4L));
        Set<Long> feedbackSolved = new HashSet<>(Arrays.asList(4L));

        // userId로 user data 가져와서 node 생성
        ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(boardDTO.getUserId());
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

        // boardId로 recommendCount 추출
        String recommendCount = recommendBoardRepository.findCountByBoardId(boardDTO.getBoardId());
        if(recommendCount == null)
            recommendCount = "0";

        // boardId로 views 추출 코드
        String views = boardViewRepository.countByBoardId(boardDTO.getBoardId());
        if(views == null)
            views = "0";

        // boardId로 solved 추출 코드 작성 요망
        Boolean solved;
        if(feedbackSolved.contains(boardDTO.getBoardType()))
            solved = adoptFeedbackRepository.findByBoardId(boardDTO.getBoardId()) != null;
        else
            solved = adoptRepository.findByBoardId(boardDTO.getBoardId()) != null;

        // boardId로 tags 추출 코드 작성 요망
//        String[] tags = ["자유분방","천방지축"];
        List<String> tagList = tagRepository.findValuesByBoardId(boardDTO.getBoardId());

        // boardId로 commentCount 추출 코드 작성 요망
        String commentCount = boardRepository.findCommentCountByBoardId(boardDTO.getBoardId());
        if (commentCount == null)
            commentCount = "0";

        boardNode.put("boardId", boardDTO.getBoardId());
        boardNode.put("boardType", boardDTO.getBoardType());
        boardNode.set("user", userNode);
        boardNode.put("title", boardDTO.getTitle());
        boardNode.put("content", boardDTO.getContent());
        if(validSolved.contains(boardDTO.getBoardType()))
            boardNode.put("solved", solved);
        boardNode.put("views", views);
        boardNode.put("recommendCount", recommendCount);
        boardNode.put("tags", tagList.toString());
        boardNode.put("commentCount", commentCount);
        boardNode.put("createdTime", String.valueOf(boardDTO.getCreatedTime()));

        return boardNode;
    }
    private ArrayNode insertCommentsNode(BoardDTO boardDTO){
        ObjectMapper objectMapper = new ObjectMapper();
        ArrayNode commentsList = objectMapper.createArrayNode();

        List<CommentEntity> commentEntities = commentRepository.findCommentEntitiesByBoardId(boardDTO.getBoardId());

        for (CommentEntity commentEntity : commentEntities) {
            CommentDTO commentDTO = CommentDTO.toCommentDTO(commentEntity);
            ObjectNode commentNode = objectMapper.createObjectNode();

            String recommend = recommendCommentRepository.countByCommentId(commentDTO.getCommentId());
            if(recommend == null)
                recommend = "0";

            // userId로 user data 가져와서 node 생성
            ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(commentDTO.getUserId());
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

            commentNode.put("commentId",commentDTO.getCommentId());
            commentNode.set("user",userNode);
            commentNode.put("content",commentDTO.getContent());
            commentNode.put("recommend",recommend);
            commentNode.put("createdTime", String.valueOf(commentDTO.getCreatedTime()));
            commentsList.add(commentNode);
        }

        return commentsList;

    }
    private ObjectNode createResultNode(List<ObjectNode> responseList) {
        ObjectMapper objectMapper = new ObjectMapper();
        ArrayNode codesArrayNode = objectMapper.createArrayNode();

        for (ObjectNode node : responseList) {
            codesArrayNode.add(node);
        }

        ObjectNode resultNode = objectMapper.createObjectNode();
        resultNode.set("contents", codesArrayNode);
        resultNode.put("total", responseList.size());

        return resultNode;
    }

}