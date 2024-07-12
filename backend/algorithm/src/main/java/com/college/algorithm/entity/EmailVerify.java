package com.college.algorithm.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "email_verify")
@NoArgsConstructor
public class EmailVerify {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "verify_id")
    private Long verifyId;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "verify_code", nullable = false)
    private String verifyCode;

    @Column(name = "verified")
    private Boolean verified;

    @Column(name = "expiration_time", nullable = false)
    private LocalDateTime expirationTime;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Builder
    public EmailVerify(String email, String verifyCode, LocalDateTime expirationTime) {
        this.email = email;
        this.verifyCode = verifyCode;
        this.expirationTime = expirationTime;
    }

    @PrePersist
    public void prePersist() {
        this.verified = false;
    }
}
