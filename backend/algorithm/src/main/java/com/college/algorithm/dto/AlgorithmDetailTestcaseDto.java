package com.college.algorithm.dto;

import com.college.algorithm.entity.Algorithm;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AlgorithmDetailTestcaseDto {
    private String input;
    private String output;
}
