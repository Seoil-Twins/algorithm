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
@Table(name = "algorithm_testcase")
@NoArgsConstructor
public class AlgorithmTestcase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "testcase_id")
    private long testcaseId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "algorithm_id", referencedColumnName = "algorithm_id")
    private Algorithm algorithm;

    @Column(name = "input", nullable = false)
    private String input;

    @Column(name = "output", nullable = false)
    private String output;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @Builder
    public AlgorithmTestcase(Algorithm algorithm, String input, String output) {
        this.algorithm = algorithm;
        this.input = input;
        this.output = output;
    }
}
