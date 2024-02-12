package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.algorithm.algorithm.dto.UserProfileDTO;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "user_try")
public class UserTryEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "try_id", columnDefinition = "INT UNSIGNED")
    private long tryId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private long userId;
    @Column(name = "algorithm_id", columnDefinition = "INT UNSIGNED")
    private long algorithmId;
    @Column(name = "solved")
    private Boolean solved;
    @Column(name = "code_id", columnDefinition = "INT UNSIGNED")
    private long codeId;
    @Column(name = "try_time")
    private String tryTime;
    @Column(name = "try_mem")
    private String tryMem;
    @Column(name = "created_time")
    private LocalDateTime createdTime;

}