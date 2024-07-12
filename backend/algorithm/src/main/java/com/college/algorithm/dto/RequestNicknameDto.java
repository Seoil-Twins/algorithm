package com.college.algorithm.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class RequestNicknameDto {
    @NotBlank(message = "닉네임은 필수 입력입니다.")
    @Size(min = 2, max = 10, message = "닉네임은 2 ~ 10자 이내로 입력해야 합니다.")
    private final String nickname;

    @JsonCreator
    public RequestNicknameDto(String nickname) {
        this.nickname = nickname;
    }
}
