package com.college.algorithm.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ResponseAlgorithmUserDto {
    private Integer userId;
    private String profile;
    private String nickname;
}
