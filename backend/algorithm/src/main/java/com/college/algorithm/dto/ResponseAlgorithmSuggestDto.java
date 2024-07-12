package com.college.algorithm.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ResponseAlgorithmSuggestDto {
    private List<AlgorithmSuggestDto> algorithms;
}
