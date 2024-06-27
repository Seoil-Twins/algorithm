package com.college.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "dummy_image")
@NoArgsConstructor
public class DummyImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @Column(name = "image_path", nullable = false)
    private String imagePath;

    @Column(name = "image_type", nullable = false)
    private String imageType;

    @Column(name = "image_size", nullable = false)
    private Long imageSize;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;
}
