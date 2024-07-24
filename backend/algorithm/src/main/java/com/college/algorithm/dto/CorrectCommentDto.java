package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class CorrectCommentDto implements Serializable {
    private Long commentId;
    private ResponseAlgorithmUserDto user;
    private String content;
    private Integer recommendCount;
    private String createdTime;
}
