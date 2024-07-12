package com.college.algorithm.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RequestLoginDto {
    @NotBlank(message = "이메일은 반드시 있어야 합니다.")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식이 올바르지 않습니다.")
    private final String email;

    @NotBlank(message = "비밀번호는 반드시 있어야 합니다.")
    @Size(min = 8, max = 20, message = "비밀번호는 8 ~ 20자 이내로 입력해야 합니다.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$", message = "영문자, 숫자, 특수문자를 1개씩 포함해야 합니다.")
    private final String userPw;
}
