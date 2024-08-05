package com.college.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "code_type")
public class CodeType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private String typeId;

    @Column(name = "type_name")
    private String typeName;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;
}
