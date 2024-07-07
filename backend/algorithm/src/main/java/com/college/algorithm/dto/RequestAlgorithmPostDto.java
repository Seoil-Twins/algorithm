package com.college.algorithm.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RequestAlgorithmPostDto {
    @NotBlank(message = "게시글 제목은 반드시 있어야 합니다.")
    private String title;
    @NotBlank(message = "게시글 내용은 반드시 있어야 합니다.")
    private String content;
    @NotNull(message = "보드 타입은 반드시 있어야 합니다.")
    @Min(value = 3, message = "알고리즘 게시글의 보드 타입은 3혹은 4만 가능합니다.")
    @Max(value = 4, message = "알고리즘 게시글의 보드 타입은 3혹은 4만 가능합니다.")
    private Integer boardType;

    private List<String> tags;
    private List<Long> imageIds;
}