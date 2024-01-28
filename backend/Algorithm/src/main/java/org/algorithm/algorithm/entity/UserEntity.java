package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.algorithm.algorithm.dto.UserDTO;

@Getter
@Setter
@Entity
@Table(name = "user")
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


    // 생성자, getter, setter 등 필요한 메서드를 추가할 수 있습니다.

    public static UserEntity toUserEntity(UserDTO userDTO) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUserPw(userDTO.getUserPw());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setNickname(userDTO.getNickname());
        return userEntity;
    }

    // Getter 및 Setter 메서드 생략
}