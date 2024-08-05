package com.college.algorithm.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RequestBoardUpdateDto {
    @NotBlank(message = "게시글 제목은 반드시 있어야 합니다.")
    private String title;
    @NotBlank(message = "게시글 내용은 반드시 있어야 합니다.")
    private String content;
    @NotNull(message = "보드 타입은 반드시 있어야 합니다.")
    @Range(min = 1, max = 4, message = "보드 타입은 1 ~ 4까지만 허용됩니다.")
    private Integer boardType;
    private List<String> tags;
    private List<Long> imageIds;
}
