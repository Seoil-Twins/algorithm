package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BoardCommentDto {
    private Long commentId;
    private ResponseBoardUserDto user;
    private String content;
    private Integer recommendCount;
    private String createdTime;
}
