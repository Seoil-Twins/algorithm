package org.algorithm.algorithm.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.algorithm.algorithm.entity.EmailVerifyEntity;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class EmailVerifyDTO {
    private long verifyId;
    private String email;
    private String verifyCode;
    private LocalDateTime expirationTime;

    //lombok 어노테이션으로 getter,setter,생성자,toString 메서드 생략 가능

    public static EmailVerifyDTO toEmailVerifyDTO(EmailVerifyEntity emailVerifyEntity) {
        EmailVerifyDTO emailVerifyDTO = new EmailVerifyDTO();
        emailVerifyEntity.setVerifyCode(emailVerifyEntity.getVerifyCode());
        emailVerifyEntity.setEmail(emailVerifyEntity.getEmail());
        emailVerifyEntity.setExpirationTime(emailVerifyEntity.getExpirationTime());
        return emailVerifyDTO;
    }

}