package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ResponseNotificationDto {
    private final List<NotificationDto> notifications;
    private final long total;
}
