package org.algorithm.algorithm.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.algorithm.algorithm.entity.ResponseUserEntity;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ResponseUserDTO {
    private Long userId;
    private String profile;
    private String nickname;

    public static ResponseUserDTO toResponseUserDTO(ResponseUserEntity userEntity) {
        ResponseUserDTO responseUserDTO = new ResponseUserDTO();
        responseUserDTO.setUserId(userEntity.getUserId());
        responseUserDTO.setProfile(userEntity.getProfile());
        responseUserDTO.setNickname(userEntity.getNickname());
        return responseUserDTO;
    }
}
