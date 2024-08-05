package com.college.algorithm.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "algorithm_correct")
@NoArgsConstructor
@DynamicInsert
public class AlgorithmCorrect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "correct_id")
    private Long correctId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private AppUser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "algorithm_id", referencedColumnName = "algorithm_id")
    private Algorithm algorithm;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "type_id", referencedColumnName = "type_id")
    private CodeType codeType;

    @Lob
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "recommend_count")
    private Integer recommendCount;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Builder
    public AlgorithmCorrect(AppUser user, Algorithm algorithm, CodeType codeType, String code) {
        this.user = user;
        this.algorithm = algorithm;
        this.codeType = codeType;
        this.code = code;
    }
}
