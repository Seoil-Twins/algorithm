package com.college.algorithm.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BoardDto {
    private Integer boardId;
    private String boardType;
    private ResponseBoardUserDto user;
    private String title;
    private Long viewCount;
    private Integer recommendCount;
    private Long commentCount;
    private List<String> tags;
    private Boolean isSolved;
    private Boolean isRecommend;
    private String createdTime;
}
