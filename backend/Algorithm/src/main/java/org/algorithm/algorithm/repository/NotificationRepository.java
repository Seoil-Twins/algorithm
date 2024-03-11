package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.NotificationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {

    Page<NotificationEntity> findAllByUserId(Pageable pageable, Long userId);

    NotificationEntity findNotificationEntityByNotificationId(Long notificationId);
}
