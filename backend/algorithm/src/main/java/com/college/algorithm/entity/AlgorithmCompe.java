package com.college.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "algorithm_compe")
public class AlgorithmCompe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "compe_id")
    private String compeId;

    @Column(name = "compe_name")
    private String compeName;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;
}
