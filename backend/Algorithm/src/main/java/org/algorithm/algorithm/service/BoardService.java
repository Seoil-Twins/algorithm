package org.algorithm.algorithm.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.*;
import org.algorithm.algorithm.entity.*;
import org.algorithm.algorithm.exception.*;
import org.algorithm.algorithm.repository.*;
import org.algorithm.algorithm.util.AlgorithmSpecification;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import javax.xml.stream.events.Comment;
import java.beans.PropertyDescriptor;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BoardService {

    public final NotificationService notificationService;

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
                boardEntities = boardRepository.findBoardEntitiesByBoardTypeInOrderByCreatedTimeDesc(pageable, boardTypes);
            }
            else if(boardType == 5)
            {
                List<Long> boardTypes = new ArrayList<>();
                boardTypes.add(1L);
                boardTypes.add(2L);
                boardEntities = boardRepository.findBoardEntitiesByBoardTypeInOrderByCreatedTimeDesc(pageable, boardTypes);
            }
            else if(boardType == 6)
            {
                List<Long> boardTypes = new ArrayList<>();
                boardTypes.add(3L);
                boardTypes.add(4L);
                boardEntities = boardRepository.findBoardEntitiesByBoardTypeInOrderByCreatedTimeDesc(pageable, boardTypes);
            }
            else {
                boardEntities = boardRepository.findBoardEntitiesByBoardTypeOrderByCreatedTimeDesc(pageable, boardType);
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
            BoardEntity boardEntity = boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(boardId);


            BoardDTO boardDTO = BoardDTO.toBoardDTO(boardEntity);
            ObjectNode boardNode = null;
            if(userDTO != null)
                boardNode = createBoardNode(boardDTO, userDTO);
            else
                boardNode = createBoardNode(boardDTO);

            boardNode.put("comments",insertCommentsNode(boardDTO));

            if(boardNode.get("solved") != null) {
                if (Objects.equals(boardNode.get("solved").toString(), "true")) {
                    if (boardDTO.getBoardType() != 4L)
                        boardNode.put("solved", adoptRepository.findCommentIdByBoardId(boardId));
                }
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

           BoardEntity boardEntity = boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(boardId);
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
                boardEntities = boardRepository.findBoardEntitiesByBoardTypeInAndAlgorithmIdOrderByCreatedTimeDesc(pageable, boardTypes, algorithmId);
            }
            else {
                boardEntities = boardRepository.findBoardEntitiesByBoardTypeAndAlgorithmIdOrderByCreatedTimeDesc(pageable, boardType, algorithmId);
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

    public void postBoard(BoardDTO boardDTO, UserDTO userDTO) {
        try {

            boardDTO.setUserId(userDTO.getUserId());
            boardDTO.setCreatedTime(LocalDateTime.now());

            if(boardDTO.getAlgorithmId() != null)
            {
                if(algorithmRepository.findOneByAlgorithmId(boardDTO.getAlgorithmId()) == null)
                    throw new NotFoundException("Algorithm Not Found. algorithm_id : " + boardDTO.getAlgorithmId());
            }

            BoardEntity boardEntity = BoardEntity.toBoardEntity(boardDTO);
            boardRepository.save(boardEntity);

        }
        catch(NotFoundException e){
            throw e;
        }
        catch (Exception e){
            throw new SQLException(" Board Algorithm All SQL Error ! ");
        }
    }

    public void postComment(CommentDTO commentDTO,Long boardId, UserDTO userDTO) {
        try {

            commentDTO.setUserId(userDTO.getUserId());
            commentDTO.setCreatedTime(LocalDateTime.now());
            commentDTO.setBoardId(boardId);

            if(boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(boardId) == null)
                throw new NotFoundException("Board Not Found. board_id : " + boardId);


            CommentEntity commentEntity = CommentEntity.toCommentEntity(commentDTO);
            commentRepository.save(commentEntity);

        }
        catch(NotFoundException e){
            throw e;
        }
        catch (Exception e){
            throw new SQLException(" Board Algorithm All SQL Error ! ");
        }
    }

    public void postAdopt(Long boardId,Long commentId, UserDTO userDTO) {
        try {

            if(boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(boardId) == null)
                throw new NotFoundException("Board Not Found. board_id : " + boardId);

            if(commentRepository.findByCommentId(commentId) == null)
                throw new NotFoundException("Comment Not Found. comment_id : " + commentId);

            if(boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(boardId).getUserId() != userDTO.getUserId())
                throw new AuthorizedException("Only Writer Adopt");

            AdoptEntity adoptEntity = new AdoptEntity();
            adoptEntity.setBoardId(boardId);
            adoptEntity.setCommentId(commentId);

            adoptRepository.save(adoptEntity);


            notificationService.postNotification(commentId, 3L,3L, userDTO);

        }
        catch(NotFoundException | AuthorizedException e){
            throw e;
        }
        catch (Exception e){
            throw new SQLException(" Board Adopt SQL Error ! ");
        }
    }

    public void postAdoptFeedback(Long boardId, UserDTO userDTO) throws BadRequestException {
        try {
            BoardEntity boardEntity = boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(boardId);
            if(boardEntity == null)
                throw new NotFoundException("Board Not Found. board_id : " + boardId);

            if(boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(boardId).getUserId() != userDTO.getUserId())
                throw new AuthorizedException("Only Writer Adopt");

            if(adoptFeedbackRepository.findByBoardId(boardId) != null)
                throw new DuplicatedExcepiton("Already Exist Adopt");

            if(boardEntity.getBoardType() != 4)
                throw new BadRequestException("Only Feedback Item Allow");

            AdoptFeedbackEntity adoptFeedbackEntity = new AdoptFeedbackEntity();
            adoptFeedbackEntity.setBoardId(boardId);

            adoptFeedbackRepository.save(adoptFeedbackEntity);

        }
        catch(NotFoundException | AuthorizedException | DuplicatedExcepiton | BadRequestException e){
            throw e;
        }
        catch (Exception e){
            throw new SQLException(" Board Adopt-Feedback SQL Error ! ");
        }
    }

    public void patchBoard(BoardDTO boardDTO, Long boardId, UserDTO userDTO){
        try {
            if(boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(boardId) == null)
                throw new NotFoundException("Board Not Found. board_id : " + boardId);

            if(boardDTO.getAlgorithmId() != null) {
                if(algorithmRepository.findOneByAlgorithmId(boardDTO.getAlgorithmId()) == null)
                    throw new NotFoundException("Algorithm Not Found. algorithm_id : " + boardDTO.getAlgorithmId());
            }

            BoardEntity existingBoard = boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(boardId);

            if(existingBoard.getUserId() != userDTO.getUserId())
                throw new AuthorizedException("Only Writer Update Board");

            BoardEntity patchRequesBoard = BoardEntity.toBoardEntity(boardDTO);
            patchRequesBoard.setBoardId(boardId);
            patchRequesBoard.setUserId(existingBoard.getUserId());

            BeanUtils.copyProperties(patchRequesBoard, existingBoard, getNullPropertyNames(patchRequesBoard));

            boardRepository.save(existingBoard);
        }
        catch (NotFoundException | AuthorizedException e ){
            throw e;
        }
        catch(Error e){
            throw new SQLException(" Board Patch SQL Error ! ");
        }
    }

    public void patchComment(CommentDTO commentDTO, Long commentId, UserDTO userDTO){
        try {
            if(commentRepository.findByCommentId(commentId) == null)
                throw new NotFoundException("Comment Not Found. comment_id : " + commentId);

            CommentEntity existingComment = commentRepository.findByCommentId(commentId);

            if(existingComment.getUserId() != userDTO.getUserId())
                throw new AuthorizedException("Only Writer Update Comment");

            CommentEntity patchRequestComment = CommentEntity.toCommentEntity(commentDTO);
            patchRequestComment.setCommentId(commentId);
            patchRequestComment.setBoardId(existingComment.getBoardId());
            patchRequestComment.setUserId(userDTO.getUserId());

            BeanUtils.copyProperties(patchRequestComment, existingComment, getNullPropertyNames(patchRequestComment));


            commentRepository.save(existingComment);
        }
        catch (NotFoundException | AuthorizedException e){
            throw e;
        }
        catch(Error e){
            throw new SQLException(" Comment Patch SQL Error ! ");
        }
    }

    public HttpStatus deleteBoard(Long boardId, UserDTO userDTO) {
        try {
            // 댓글 엔티티 검색
            BoardEntity boardEntity = boardRepository.findById(boardId).orElse(null);

            // 해당 댓글이 없으면 NotFoundException 발생
            if (boardEntity == null)
                throw new NotFoundException("Not Found Comment. comment_id : " + boardId);

            // 유저 확인 (옵션: 댓글 작성자와 현재 유저가 같은지 확인)
            if (!boardEntity.getUserId().equals(userDTO.getUserId()))
                throw new BadRequestException("User not authorized to edit this board.");

            // 댓글 삭제
            boardRepository.delete(boardEntity);

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
            // 댓글 엔티티 검색
            CommentEntity commentEntity = commentRepository.findByCommentId(commentId);

            // 해당 댓글이 없으면 NotFoundException 발생
            if (commentEntity == null)
                throw new NotFoundException("Not Found Comment. comment_id : " + commentId);

            // 유저 확인 (옵션: 댓글 작성자와 현재 유저가 같은지 확인)
            if (!commentEntity.getUserId().equals(userDTO.getUserId()))
                throw new AuthorizedException("User not authorized to edit this comment.");

            // 댓글 삭제
            commentRepository.delete(commentEntity);

            return HttpStatus.OK;

        }
        catch (NotFoundException | AuthorizedException e){
            throw e;
        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to delete board.");
        }
    }

    public ObjectNode getBoardType() {
        try {
            ObjectMapper objectMappere = new ObjectMapper();
            ObjectNode typeNode = objectMappere.createObjectNode();

            typeNode.put("1",boardRepository.find1Type());
            typeNode.put("2",boardRepository.find2Type());
            typeNode.put("3",boardRepository.find3Type());
            typeNode.put("4",boardRepository.find4Type());

            return typeNode;

        }
        catch (NotFoundException | AuthorizedException e){
            throw e;
        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to delete board.");
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
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode tagNode = mapper.createArrayNode();

        // tagList를 ArrayNode에 추가
            for (String tag : tagList) {
                tagNode.add(tag);
            }

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
        boardNode.set("tags", tagNode);
        boardNode.put("commentCount", commentCount);
        boardNode.put("isRecommend", isRecommend);
        boardNode.put("isView", isView);
        boardNode.put("createdTime", String.valueOf(boardDTO.getCreatedTime()));

        return boardNode;
    }

    public ObjectNode createBoardNode(BoardDTO boardDTO, long userId) throws JsonProcessingException {
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
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode tagNode = mapper.createArrayNode();

        // tagList를 ArrayNode에 추가
        for (String tag : tagList) {
            tagNode.add(tag);
        }

        // boardId로 commentCount 추출 코드 작성 요망
        String commentCount = boardRepository.findCommentCountByBoardId(boardDTO.getBoardId());
        if (commentCount == null)
            commentCount = "0";

//        // boardId로 isRecommend 추출 코드 작성 요망
        Boolean isRecommend = recommendBoardRepository.findByBoardIdAndUserId(boardDTO.getBoardId(),userId) != null;
//
//        // boardId로 isView 추출 코드 작성 요망
        Boolean isView = boardViewRepository.findByBoardIdAndUserId(boardDTO.getBoardId(),userId) != null;

        boardNode.put("boardId", boardDTO.getBoardId());
        boardNode.put("boardType", boardDTO.getBoardType());
        boardNode.set("user", userNode);
        boardNode.put("title", boardDTO.getTitle());
        boardNode.put("content", boardDTO.getContent());
        if(validSolved.contains(boardDTO.getBoardType()))
            boardNode.put("solved", solved);
        boardNode.put("views", views);
        boardNode.put("recommendCount", recommendCount);
        boardNode.set("tags", tagNode);
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
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode tagNode = mapper.createArrayNode();

        // tagList를 ArrayNode에 추가
        for (String tag : tagList) {
            tagNode.add(tag);
        }

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
        boardNode.set("tags", tagNode);
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
            commentNode.put("recommendCount",recommend);
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

    private String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

}