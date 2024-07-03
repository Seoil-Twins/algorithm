package com.college.algorithm.service;

import com.college.algorithm.dto.NotificationDto;
import com.college.algorithm.dto.ResponseNotificationDto;
import com.college.algorithm.entity.AppUser;
import com.college.algorithm.entity.Notification;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.mapper.NotificationMapper;
import com.college.algorithm.repository.NotificationRepository;
import com.college.algorithm.repository.UserRepository;
import com.college.algorithm.type.NotificationType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public ResponseNotificationDto getNotifications(long userId, int page, int count) {
        Pageable pageable = PageRequest.of(page - 1, count);

        AppUser user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Page<Notification> notificationPage = notificationRepository.findAllByNotificationTypeInOrToUserAndBoardDeletedIsFalseAndFromUserDeletedIsFalseOrderByCreatedTimeDesc(
                List.of(NotificationType.NOTICE.getTypeId(), NotificationType.EVENT.getTypeId()),
                user,
                pageable
        );
        List<Notification> notifications = notificationPage.getContent();
        List<NotificationDto> notificationDtos = notifications.stream()
                .map(NotificationMapper.INSTANCE::toNotificationDto)
                .toList();

        long total = notificationPage.getTotalElements();

        return new ResponseNotificationDto(notificationDtos, total);
    }
}
