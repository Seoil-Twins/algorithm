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
import org.algorithm.algorithm.exception.NotFoundException;
import org.algorithm.algorithm.exception.BadRequestException;
import org.algorithm.algorithm.exception.SQLException;
import org.algorithm.algorithm.exception.StorageException;
import org.algorithm.algorithm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.parser.Entity;
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
public class NotificationService {

    public final NotificationRepository notificationRepository;

    public final AlgorithmRepository algorithmRepository;
    public final CodeRepository codeRepository;
    public final BoardRepository boardRepository;
    public final CommentRepository commentRepository;

    public final UserRepository userRepository;

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
}