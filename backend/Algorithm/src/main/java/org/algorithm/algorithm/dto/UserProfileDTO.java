package org.algorithm.algorithm.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.algorithm.algorithm.entity.UserProfileEntity;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserProfileDTO {
    private long userProfileId;
    private long userId;
    private long size;
    private String type;
    private String path;

    //lombok 어노테이션으로 getter,setter,생성자,toString 메서드 생략 가능

    public static UserProfileDTO toUserProfileDTO(UserProfileEntity userProfileEntity){
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setUserId(userProfileEntity.getUserId());
        userProfileDTO.setSize(userProfileEntity.getSize());
        userProfileDTO.setType(userProfileEntity.getType());
        userProfileDTO.setPath(userProfileEntity.getPath());

        return userProfileDTO;
    }

}
