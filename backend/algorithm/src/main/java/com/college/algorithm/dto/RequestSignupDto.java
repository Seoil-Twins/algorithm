package com.college.algorithm.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RequestSignupDto {
    @NotBlank(message = "이메일은 반드시 있어야 합니다.")
    private final String email;
    @NotBlank(message = "비밀번호는 반드시 있어야 합니다.")
    private final String userPw;
    @NotBlank(message = "닉네임은 반드시 있어야 합니다.")
    private final String nickname;
}
