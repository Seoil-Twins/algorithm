package com.college.algorithm.repository;

import com.college.algorithm.entity.AppUser;
import com.college.algorithm.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // 받는 사람(touser) 또는 공지사항, 이벤트라면 가져오되, 게시판 및 보낸 사람이 삭제가 안 되어 있어야 한다.
    Page<Notification> findAllByNotificationTypeInOrToUserAndBoardDeletedIsFalseAndFromUserDeletedIsFalseOrderByCreatedTimeDesc(List<String> types, AppUser toUser, Pageable pageable);
}
