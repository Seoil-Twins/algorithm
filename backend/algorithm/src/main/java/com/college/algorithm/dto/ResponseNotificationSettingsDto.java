package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseNotificationSettingsDto {
    private final boolean primaryNofi;
    private final boolean commentNofi;
    private final boolean likeNofi;
    private final boolean answerNofi;
    private final boolean eventNofi;
}
