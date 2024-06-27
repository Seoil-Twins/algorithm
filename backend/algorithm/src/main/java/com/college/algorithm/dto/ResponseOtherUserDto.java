package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class ResponseOtherUserDto {
    private final Long userId;
    private final String nickname;
    private final String profile;
    private final Long tried;
    private final Long solved;
    private final Long favorite;
}
