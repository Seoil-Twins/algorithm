package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ResponseAlgorithmDto {
    private List<AlgorithmDto> algorithms;
    private Long total;
}
