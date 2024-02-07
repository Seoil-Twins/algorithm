package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "favorite")
public class FavoriteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id ")
    private long favoriteId;
    @Column(name = "user_id")
    private long userId;
    @Column(name = "target_id")
    private long targetId;
    @Column(name = "target_type")
    private String targetType;
    @Column(name = "created_time")
    private LocalDateTime createdTime;
}
