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
    private long userId;

    @Column(name = "user_pw", nullable = false)
    private String userPw;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "nickname", nullable = false, unique = true)
    private String nickname;

    @Column(name = "tried")
    private long tried;

    @Column(name = "solved")
    private long solved;

    @Column(name = "profile_path")
    private String profilePath;

    @Column(name = "profile_type")
    private String profileType;

    @Column(name = "profile_size")
    private long profileSize;

    @Column(name = "primary_nofi")
    private boolean primaryNofi;

    @Column(name = "comment_nofi")
    private boolean commentNofi;

    @Column(name = "like_nofi")
    private boolean likeNofi;

    @Column(name = "answer_nofi")
    private boolean answerNofi;

    @Column(name = "event_nofi")
    private boolean eventNofi;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "deleted_time")
    private LocalDateTime deletedTime;

    @Builder
    public AppUser(String userPw, String email, String nickname) {
        this.userPw = userPw;
        this.email = email;
        this.nickname = nickname;
    }
}
