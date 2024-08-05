package com.college.algorithm.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "explanation")
@NoArgsConstructor
public class Explanation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "explanation_id")
    private Long explanationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "algorithm_id", referencedColumnName = "algorithm_id", nullable = false)
    private Algorithm algorithm;

    @Lob
    @Column(name = "content")
    private String content;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @UpdateTimestamp
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    @Builder
    public Explanation(Algorithm algorithm, String content) {
        this.algorithm = algorithm;
        this.content = content;
    }
}
