package com.college.algorithm.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "app_user")
@NoArgsConstructor
@DynamicInsert
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_pw", nullable = false)
    private String userPw;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "nickname", nullable = false, unique = true)
    private String nickname;

    @Column(name = "tried")
    private Long tried;

    @Column(name = "solved")
    private Long solved;

    @Column(name = "profile_path")
    private String profilePath;

    @Column(name = "profile_type")
    private String profileType;

    @Column(name = "profile_size")
    private Long profileSize;

    @Column(name = "primary_nofi")
    private Boolean primaryNofi;

    @Column(name = "comment_nofi")
    private Boolean commentNofi;

    @Column(name = "like_nofi")
    private Boolean likeNofi;

    @Column(name = "answer_nofi")
    private Boolean answerNofi;

    @Column(name = "event_nofi")
    private Boolean eventNofi;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Column(name = "deleted")
    private Boolean deleted;

    @Column(name = "deleted_time")
    private LocalDateTime deletedTime;

    @Builder
    public AppUser(String userPw, String email, String nickname, String defaultProfilePath) {
        this.userPw = userPw;
        this.email = email;
        this.nickname = nickname;
        this.profilePath = defaultProfilePath;
    }
}
