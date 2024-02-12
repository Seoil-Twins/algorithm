package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.algorithm.algorithm.dto.UserProfileDTO;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "user_link")
public class UserLinkEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "link_id", columnDefinition = "INT UNSIGNED")
    private long linkId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private long userId;
    @Column(name = "link_kind")
    private String linkKind;
    @Column(name = "domain")
    private String domain;
    @Column(name = "created_time")
    private LocalDateTime createdTime;


}