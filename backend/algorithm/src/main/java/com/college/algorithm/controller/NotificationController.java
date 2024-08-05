package com.college.algorithm.controller;

import com.college.algorithm.dto.ResponseNotificationDto;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
@ResponseBody
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<?> getNotifications(
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @RequestParam(value = "count", defaultValue = "5", required = false) int count,
            final HttpServletRequest request
    ) {
        Object userId = request.getSession().getAttribute("userId");
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        ResponseNotificationDto dto = notificationService.getNotifications(Long.parseLong(userId.toString()), page, count);
        return ResponseEntity.ok().body(dto);
    }
}
