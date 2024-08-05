package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class ResponseBoardSuggestDto {
    List<BoardSuggestDto> boards;
}
