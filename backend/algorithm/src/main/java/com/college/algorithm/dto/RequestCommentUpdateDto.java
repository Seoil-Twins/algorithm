package com.college.algorithm.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RequestCommentUpdateDto {
    @NotBlank(message = "게시글 내용은 반드시 있어야 합니다.")
    private String content;
}
