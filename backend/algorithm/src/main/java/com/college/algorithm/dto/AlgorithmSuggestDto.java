package com.college.algorithm.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AlgorithmSuggestDto {
    private Long algorithmId;
    private String title;
    private String kind;
    private String content;
}
