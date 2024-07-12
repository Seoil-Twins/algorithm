package com.college.algorithm.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class RequestCodeDto {
    @NotBlank(message = "코드는 반드시 있어야 합니다.")
    private String code;
    @NotBlank(message = "코드 타입은 반드시 있어야 합니다.")
    private String type;
}
