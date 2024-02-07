package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.algorithm.algorithm.dto.UserProfileDTO;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Setter
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "user_profile")
public class UserProfileEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_profile_id")
    private long userProfileId;
    @Column(name = "user_id")
    private long userId;
    @Column(name = "size")
    private long size;
    @Column(name = "type")
    private String type;
    @Column(name = "path")
    private String path;


    // 생성자, getter, setter 등 필요한 메서드를 추가할 수 있습니다.

    public static UserProfileEntity toUserProfileEntity(UserProfileDTO userProfileDTO) {
        UserProfileEntity userProfileEntity = new UserProfileEntity();
        userProfileEntity.setUserId(userProfileDTO.getUserId());
        userProfileEntity.setSize(userProfileDTO.getSize());
        userProfileEntity.setType(userProfileDTO.getType());
        userProfileEntity.setPath(userProfileDTO.getPath());
        return userProfileEntity;
    }

    // Getter 및 Setter 메서드 생략
}