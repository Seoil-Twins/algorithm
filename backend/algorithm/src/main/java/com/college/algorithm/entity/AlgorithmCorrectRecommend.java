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
@Table(name = "algorithm_correct_recommend")
@NoArgsConstructor
public class AlgorithmCorrectRecommend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommend_id")
    private Long recommendId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private AppUser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "correct_id", referencedColumnName = "correct_id", nullable = false)
    private AlgorithmCorrect correct;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Builder
    public AlgorithmCorrectRecommend(AppUser user, AlgorithmCorrect correct) {
        this.user = user;
        this.correct = correct;
    }
}
