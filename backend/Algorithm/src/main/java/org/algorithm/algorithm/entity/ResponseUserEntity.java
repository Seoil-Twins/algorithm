package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SQLDelete;

@Getter
@Setter
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "user")
@SQLDelete(sql = "UPDATE user SET deleted = true WHERE user_id = ?")
public class ResponseUserEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userId;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "profile")
    private String profile;


}