package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
}
