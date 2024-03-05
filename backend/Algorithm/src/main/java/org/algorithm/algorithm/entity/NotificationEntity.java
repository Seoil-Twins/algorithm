package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "notification")
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id", columnDefinition = "INT UNSIGNED")
    private Long notificationId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private Long userId;
    @Column(name = "other_user_id", columnDefinition = "INT UNSIGNED")
    private Long otherUserId;
    @Column(name = "target_id", columnDefinition = "INT UNSIGNED")
    private Long targetId;
    @Column(name = "target_type", columnDefinition = "INT UNSIGNED")
    private Long targetType;
    @Column(name = "title")
    private String title;
    @Column(name = "content")
    private String content;
}
