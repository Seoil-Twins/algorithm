package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CorrectCommentDto {
    private Long commentId;
    private ResponseAlgorithmUserDto user;
    private String content;
    private Integer recommendCount;
    private String createdTime;
}
