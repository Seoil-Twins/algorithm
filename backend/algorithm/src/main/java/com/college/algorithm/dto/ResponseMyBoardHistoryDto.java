package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ResponseMyBoardHistoryDto {
    private final List<BoardIntroDto> results;
    private final long total;
}
