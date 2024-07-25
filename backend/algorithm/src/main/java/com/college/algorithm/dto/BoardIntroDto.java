package com.college.algorithm.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BoardIntroDto {
    private final long boardId;
    private final Character boardType;
    private final String title;
    private final String content;
    private final int likeCount;
    private final long commentCount;
    private final Boolean isSolved;
    private final String createdTime;
}
