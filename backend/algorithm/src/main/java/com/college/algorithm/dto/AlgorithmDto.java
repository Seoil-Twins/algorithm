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
    private AppUser user;
    private AlgorithmKind kind;
    private AlgorithmCompe compe;
    private String title;
    private String content;
    private Character level;
    private String limitTime;
    private String limitMemory;
    private Integer recommendCount;
    private String createdTime;
    private String updatedTime;
}
