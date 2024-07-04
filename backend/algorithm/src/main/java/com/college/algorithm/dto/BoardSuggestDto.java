package com.college.algorithm.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BoardSuggestDto {
    private Long boardId;
    private String boardType;
    private ResponseBoardUserDto user;
    private String title;
    private List<String> tags;
}
