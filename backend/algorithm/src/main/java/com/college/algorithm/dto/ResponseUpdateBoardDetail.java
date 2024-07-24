package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponseUpdateBoardDetail {
    private Integer boardId;
    private String boardType;
    private String title;
    private String content;
    private String[] tags;
    private Integer[] imageIds;
    private String createdTime;
}
