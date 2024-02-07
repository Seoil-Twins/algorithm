package org.algorithm.algorithm.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.algorithm.algorithm.entity.UserEntity;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserDTO {
    private long userId;
    private String userPw;
    private String email;
    private String nickname;
    private Boolean annoNofi;
    private Boolean postNofi;
    private Boolean commentNofi;
    private Boolean likeNofi;
    private Boolean answerNofi;
    private Boolean eventNofi;

    //lombok 어노테이션으로 getter,setter,생성자,toString 메서드 생략 가능

    public static UserDTO toUserDTO(UserEntity userEntity){
        UserDTO userDTO = new UserDTO();
        userDTO.setUserPw(userEntity.getUserPw());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setNickname(userEntity.getNickname());
        userDTO.setAnnoNofi(userEntity.getAnnoNofi());
        userDTO.setPostNofi(userEntity.getPostNofi());
        userDTO.setCommentNofi(userEntity.getCommentNofi());
        userDTO.setLikeNofi(userEntity.getLikeNofi());
        userDTO.setAnswerNofi(userEntity.getAnswerNofi());
        userDTO.setEventNofi(userEntity.getEventNofi());

        return userDTO;
    }

    public static UserDTO toSessionDTO(UserEntity userEntity){
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(userEntity.getUserId());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setNickname(userEntity.getNickname());
        userDTO.setAnnoNofi(userEntity.getAnnoNofi());
        userDTO.setPostNofi(userEntity.getPostNofi());
        userDTO.setCommentNofi(userEntity.getCommentNofi());
        userDTO.setLikeNofi(userEntity.getLikeNofi());
        userDTO.setAnswerNofi(userEntity.getAnswerNofi());
        userDTO.setEventNofi(userEntity.getEventNofi());

        return userDTO;
    }
}
