package com.college.algorithm.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RequestCompareVerifycodeDto {
    @NotBlank(message = "이메일은 반드시 있어야 합니다.")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식이 올바르지 않습니다.")
    private final String email;

    @NotBlank(message = "인증번호는 반드시 있어야 합니다.")
    @Size(min = 6, max = 6, message = "인증번호는 6자리로 구성되어야 합니다.")
    private final String verifyCode;
}
