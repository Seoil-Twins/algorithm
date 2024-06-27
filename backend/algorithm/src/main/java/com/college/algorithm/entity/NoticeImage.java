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
@Table(name = "notice_image")
@NoArgsConstructor
public class NoticeImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private long imageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "notice_id", referencedColumnName = "notice_id", nullable = false)
    private Notice notice;

    @Column(name = "image_path", nullable = false)
    private String imagePath;

    @Column(name = "image_type", nullable = false)
    private String imageType;

    @Column(name = "image_size", nullable = false)
    private long imageSize;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Builder
    public NoticeImage(Notice notice, String imagePath, String imageType, long imageSize) {
        this.notice = notice;
        this.imagePath = imagePath;
        this.imageType = imageType;
        this.imageSize = imageSize;
    }
}
