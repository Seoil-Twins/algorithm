package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseMyAlgorithmDto {
    private final int tried;
    private final int solved;
    private final int favorite;
}
