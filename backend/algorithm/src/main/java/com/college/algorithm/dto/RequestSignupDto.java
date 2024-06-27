package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RequestSignupDto {
    private final String email;
    private final String userPw;
    private final String nickname;
}
