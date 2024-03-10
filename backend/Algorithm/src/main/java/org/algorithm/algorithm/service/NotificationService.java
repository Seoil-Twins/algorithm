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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class NotificationService {

    public final NotificationRepository notificationRepository;

    public final AlgorithmRepository algorithmRepository;
    public final CodeRepository codeRepository;
    public final BoardRepository boardRepository;
    public final CommentRepository commentRepository;

    public final UserRepository userRepository;
    public final ResponseUserRepository responseUserRepository;
    public final UserProfileRepository userProfileRepository;

    public ObjectNode getNotification(Long userId,int page, int count) {
        try {
            Pageable pageable = PageRequest.of(page-1, count);
            Page<NotificationEntity> notificationEntities =  notificationRepository.findAllByUserId(pageable,userId);

            // 랭킹을  찾지 못하면 오류 반환
            if (notificationEntities == null) {
                throw new NotFoundException("notification Not Found ! ");
            }

            List<NotificationEntity> resultValue = notificationEntities.getContent();
            List<ObjectNode> responseList = new ArrayList<>();

            for (NotificationEntity notificationEntity : resultValue) {
                ObjectNode notificationNode = createNotificationNode(notificationEntity);
                responseList.add(notificationNode);
            }

            return createResultNode(responseList);
        }
        catch(NotFoundException | BadRequestException e){
            throw e;
        }
        catch(Error e){
            throw new SQLException("Notification SQL Error ! ");
        }
    }

    public NotificationEntity postNotification(Long targetId, Long targetType, Long notificationType, UserDTO userDTO){
        try {
            NotificationEntity notificationEntity = new NotificationEntity();
            String title = null;

            if(notificationType == 1L){
                title = "님이 게시글에 추천을 남겼습니다.";
            }
            else if(notificationType == 2L){
                title = "님이 댓글에 추천을 남겼습니다.";
            }
            else if(notificationType == 3L){
                title = "님이 댓글을 채택했습니다.";
            }
            else if(notificationType == 4L){
                title = "님 공지사항이 있어요.";
            }
            else if(notificationType == 5L){
                title = "님 이벤트가 있어요.";
            }
            else if(notificationType == 6L){
                title = "님이 코드에 좋아요를 남겼어요.";
            }
            else {
                throw new BadRequestException("notificationType 1 ~ 6");
            }

            if (targetType == 1L) { // codeId
                CodeEntity targetEntity = codeRepository.findCodeEntityByCodeId(targetId);
                AlgorithmEntity algorithmEntity = algorithmRepository.findOneByAlgorithmId(targetEntity.getAlgorithmId());
                UserEntity userEntity = userRepository.findByUserId(userDTO.getUserId());

                if(targetEntity == null)
                    throw new NotFoundException("Not Found;");
                if(algorithmEntity == null)
                    throw new NotFoundException("Not Found;");

                notificationEntity.setUserId(userDTO.getUserId());
                notificationEntity.setOtherUserId(targetEntity.getUserId());
                notificationEntity.setTargetId(targetId);
                notificationEntity.setTargetType(targetType);
                notificationEntity.setTitle(userEntity.getNickname() + title);
                notificationEntity.setContent(algorithmEntity.getTitle());
            }
            else if(targetType == 2L) { // board
                BoardEntity targetEntity = boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(targetId);
                UserEntity userEntity = userRepository.findByUserId(userDTO.getUserId());

                if(targetEntity == null)
                    throw new NotFoundException("Not Found;");

                notificationEntity.setUserId(userDTO.getUserId());
                notificationEntity.setOtherUserId(targetEntity.getUserId());
                notificationEntity.setTargetId(targetId);
                notificationEntity.setTargetType(targetType);
                notificationEntity.setTitle(userEntity.getNickname() + title);
                notificationEntity.setContent(targetEntity.getTitle());
            }
            else if(targetType == 3L) { // comment
                CommentEntity targetEntity = commentRepository.findByCommentId(targetId);
                BoardEntity boardEntity = boardRepository.findBoardEntityByBoardIdOrderByCreatedTime(targetEntity.getBoardId());
                if(targetEntity == null)
                    throw new NotFoundException("Not Found;");

                if(boardEntity == null)
                    throw new NotFoundException("Not Found;");

                UserEntity userEntity = userRepository.findByUserId(userDTO.getUserId());

                notificationEntity.setUserId(userDTO.getUserId());
                notificationEntity.setOtherUserId(targetEntity.getUserId());
                notificationEntity.setTargetId(targetId);
                notificationEntity.setTargetType(targetType);
                notificationEntity.setTitle(userEntity.getNickname() + title);
                notificationEntity.setContent(boardEntity.getTitle());
                notificationEntity.setCreatedTime(LocalDateTime.now());
            }
            else {
                throw new BadRequestException("targetType 1 ~ 3");
            }


            NotificationEntity savedEntity = notificationRepository.save(notificationEntity);

            return savedEntity;

        }
        catch(NotFoundException | BadRequestException e){
            throw e;
        }
        catch(Error e){
            throw new SQLException("Ranking SQL Error ! ");
        }
    }

    public ResponseEntity<?> deleteNotification(Long notificationId, UserDTO userDTO) {
        try {
            NotificationEntity notificationEntitiy =  notificationRepository.findNotificationEntityByNotificationId(notificationId);

            // 랭킹을  찾지 못하면 오류 반환
            if (notificationEntitiy == null) {
                throw new NotFoundException("notification Not Found ! ");
            }

            if(userDTO.getUserId() != notificationEntitiy.getUserId())
                throw new AuthorizedException("Only Writer Delete Notification ! ");

            notificationRepository.delete(notificationEntitiy);

            return ResponseEntity.ok("Delete ! ");
        }
        catch(NotFoundException | AuthorizedException e){
            throw e;
        }
        catch(Error e){
            throw new SQLException("Notification SQL Error ! ");
        }
    }

    private ObjectNode createNotificationNode(NotificationEntity notificationEntity){
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode notificationNode = objectMapper.createObjectNode();

        // userId로 user data 가져와서 node 생성
        ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(notificationEntity.getUserId());
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

        // otherUserId로 user data 가져와서 node 생성
        ResponseUserEntity otherUserEntity = responseUserRepository.findDefaultByUserId(notificationEntity.getOtherUserId());
        ResponseUserDTO responseOtherUserDTO = ResponseUserDTO.toResponseUserDTO(otherUserEntity);

        UserProfileEntity otherUserProfileEntity = userProfileRepository.findUserProfileEntityByUserId(responseOtherUserDTO.getUserId());
        String otherProfile;

        if (otherUserProfileEntity == null) {
            otherProfile = null;
        } else {
            otherProfile = otherUserProfileEntity.getPath();
        }

        ObjectNode otherUserNode = objectMapper.createObjectNode();
        otherUserNode.put("userId", responseOtherUserDTO.getUserId());
        otherUserNode.put("profile", otherProfile);
        otherUserNode.put("nickname", responseOtherUserDTO.getNickname());



        notificationNode.put("notificationId", notificationEntity.getNotificationId());
        notificationNode.set("user", userNode);
        notificationNode.set("otherUser", otherUserNode);
        notificationNode.put("targetId", notificationEntity.getTargetId());
        notificationNode.put("targetType", notificationEntity.getTargetType());
        notificationNode.put("title", notificationEntity.getTitle());
        notificationNode.put("content", notificationEntity.getContent());
        notificationNode.put("createdTime", String.valueOf(notificationEntity.getCreatedTime()));

        return notificationNode;
    }

    private ObjectNode createResultNode(List<ObjectNode> responseList) {
        ObjectMapper objectMapper = new ObjectMapper();
        ArrayNode codesArrayNode = objectMapper.createArrayNode();

        for (ObjectNode node : responseList) {
            codesArrayNode.add(node);
        }

        ObjectNode resultNode = objectMapper.createObjectNode();
        resultNode.set("notifications", codesArrayNode);
        resultNode.put("total", responseList.size());

        return resultNode;
    }

}