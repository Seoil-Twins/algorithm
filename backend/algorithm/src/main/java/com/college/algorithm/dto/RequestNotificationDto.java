package com.college.algorithm.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RequestNotificationDto {
    private final Boolean primaryNofi;
    private final Boolean commentNofi;
    private final Boolean likeNofi;
    private final Boolean answerNofi;
    private final Boolean eventNofi;
}
