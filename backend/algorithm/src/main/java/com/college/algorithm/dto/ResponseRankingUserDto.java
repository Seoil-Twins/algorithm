package com.college.algorithm.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResponseRankingUserDto {
    private Integer userId;
    private String profile;
    private String nickname;
}
