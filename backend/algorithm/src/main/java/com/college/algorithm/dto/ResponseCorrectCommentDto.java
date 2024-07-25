package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ResponseCorrectCommentDto {
    private List<CorrectCommentDto> comments;
    private Long total;
}
