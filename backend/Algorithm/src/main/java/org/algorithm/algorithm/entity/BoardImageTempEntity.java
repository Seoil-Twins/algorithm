package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.algorithm.algorithm.dto.UserProfileDTO;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Setter
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "board_image_temp")
public class BoardImageTempEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_image_id", columnDefinition = "INT UNSIGNED")
    private long boardImageId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private long userId;
    @Column(name = "size", columnDefinition = "INT UNSIGNED")
    private long size;
    @Column(name = "type")
    private String type;
    @Column(name = "path")
    private String path;

    // Getter 및 Setter 메서드 생략
}