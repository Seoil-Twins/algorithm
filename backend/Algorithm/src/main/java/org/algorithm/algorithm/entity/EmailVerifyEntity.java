package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.algorithm.algorithm.dto.EmailVerifyDTO;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "email_verify")
public class EmailVerifyEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "verify_id", columnDefinition = "INT UNSIGNED")
    private long verifyId;
    @Column(name = "email")
    private String email;
    @Column(name = "verify_code")
    private String verifyCode;
    @Column(name = "expiration_time")
    private LocalDateTime expirationTime;


    // 생성자, getter, setter 등 필요한 메서드를 추가할 수 있습니다.
    public EmailVerifyEntity() {
    }
    public EmailVerifyEntity(String verifyCode, String email, LocalDateTime expirationTime) {
        this.verifyCode = verifyCode;
        this.email = email;
        this.expirationTime = expirationTime;
    }

    public static EmailVerifyEntity toEmailVerifyEntity(EmailVerifyDTO emailVerifyDTO) {
        EmailVerifyEntity emailVerifyEntity = new EmailVerifyEntity();
        emailVerifyDTO.setVerifyCode(emailVerifyDTO.getVerifyCode());
        emailVerifyDTO.setEmail(emailVerifyDTO.getEmail());
        emailVerifyDTO.setExpirationTime(emailVerifyDTO.getExpirationTime());
        return emailVerifyEntity;
    }

    // Getter 및 Setter 메서드 생략
}
