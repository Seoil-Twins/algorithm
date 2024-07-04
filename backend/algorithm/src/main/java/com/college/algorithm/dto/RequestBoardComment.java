package com.college.algorithm.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RequestBoardComment {
    @NotBlank(message = "댓글의 내용은 반드시 있어야 합니다.")
    private String content;
}
