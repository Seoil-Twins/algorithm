package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.algorithm.algorithm.dto.UserDTO;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;

@Getter
@Setter
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "user")
@SQLDelete(sql = "UPDATE user SET deleted = true WHERE user_id = ?")
public class UserEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userId;
    @Column(name = "user_pw")
    private String userPw;
    @Column(name = "email")
    private String email;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "anno_nofi")
    @ColumnDefault("boolean default true")
    private Boolean annoNofi;
    @Column(name = "post_nofi")
    @ColumnDefault("boolean default true")
    private Boolean postNofi;
    @Column(name = "comment_nofi")
    @ColumnDefault("boolean default true")
    private Boolean commentNofi;
    @Column(name = "like_nofi")
    @ColumnDefault("boolean default true")
    private Boolean likeNofi;
    @Column(name = "answer_nofi")
    @ColumnDefault("boolean default true")
    private Boolean answerNofi;
    @Column(name = "event_nofi")
    @ColumnDefault("boolean default true")
    private Boolean eventNofi;


    // 생성자, getter, setter 등 필요한 메서드를 추가할 수 있습니다.

    public static UserEntity toUserEntity(UserDTO userDTO) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUserPw(userDTO.getUserPw());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setNickname(userDTO.getNickname());
        userEntity.setAnnoNofi(userDTO.getAnnoNofi());
        userEntity.setPostNofi(userDTO.getPostNofi());
        userEntity.setCommentNofi(userDTO.getCommentNofi());
        userEntity.setLikeNofi(userDTO.getLikeNofi());
        userEntity.setAnswerNofi(userDTO.getAnswerNofi());
        userEntity.setEventNofi(userDTO.getEventNofi());
        return userEntity;
    }

    // Getter 및 Setter 메서드 생략
}