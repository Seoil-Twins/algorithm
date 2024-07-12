package com.college.algorithm.dto;

import com.college.algorithm.entity.AlgorithmCompe;
import com.college.algorithm.entity.AlgorithmKind;
import com.college.algorithm.entity.AppUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
public class AlgorithmDto {
    private Long algorithmId;
    private String title;
    private Character level;
    private String kind;
    private Float correctRate;
    private Boolean solved;
}
