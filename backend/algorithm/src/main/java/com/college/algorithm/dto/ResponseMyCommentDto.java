package com.college.algorithm.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ResponseMyCommentDto {
    @Getter
    @AllArgsConstructor
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class CommentDto {
        private final long boardId;
        private final String title;
        private final String content;
        private final int likeCount;
        private final Boolean isSolved;
        private final String createdTime;
    }

    private final List<CommentDto> comments;
    private final long total;
}
