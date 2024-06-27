package com.college.algorithm.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "algorithm_image")
@NoArgsConstructor
public class AlgorithmImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "algorithm_id", referencedColumnName = "algorithm_id", nullable = false)
    private Algorithm algorithm;

    @Column(name = "image_path", nullable = false)
    private String imagePath;

    @Column(name = "image_type", nullable = false)
    private String imageType;

    @Column(name = "image_size", nullable = false)
    private Long imageSize;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Builder
    public AlgorithmImage(Algorithm algorithm, String imagePath, String imageType, Long imageSize) {
        this.algorithm = algorithm;
        this.imagePath = imagePath;
        this.imageType = imageType;
        this.imageSize = imageSize;
    }
}
