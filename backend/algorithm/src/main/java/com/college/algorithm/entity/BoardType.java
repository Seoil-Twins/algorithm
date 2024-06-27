package com.college.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "board_type")
public class BoardType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private char typeId;

    @Column(name = "type_name")
    private String typeName;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;
}
