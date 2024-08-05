package com.college.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "algorithm_kind")
public class AlgorithmKind {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kind_id")
    private String kindId;

    @Column(name = "kind_name")
    private String kindName;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;
}
