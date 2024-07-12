package com.college.algorithm.dto;

import com.college.algorithm.entity.Algorithm;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class AlgorithmTestcaseDto {
    private Long testcaseId;

    private Algorithm algorithm;

    private String input;

    private String output;

    private LocalDateTime createdTime;

}
