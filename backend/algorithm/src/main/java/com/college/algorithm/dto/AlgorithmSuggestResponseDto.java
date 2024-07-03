package com.college.algorithm.dto;

import com.college.algorithm.entity.Algorithm;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AlgorithmSuggestResponseDto {
    private List<AlgorithmSuggestDto> algorithms;
}
