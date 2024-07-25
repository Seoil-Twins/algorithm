package com.college.algorithm.dto;

import com.college.algorithm.validation.ValidAtLeastOnField;
import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@ValidAtLeastOnField(fields = { "email", "nickname" }, message = "이메일 또는 닉네임은 반드시 입력해야 합니다.")
public class RequestUpdateProfileDto {
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식이 올바르지 않습니다.")
    private final String email;

    @Size(min = 2, max = 10, message = "닉네임은 2 ~ 10자 이내로 입력해야 합니다.")
    private final String nickname;
}
