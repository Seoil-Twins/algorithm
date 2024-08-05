package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ResponseMyBoardDto {
    private final List<BoardIntroDto> boards;
    private final long total;
}
