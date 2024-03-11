package org.algorithm.algorithm.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.service.FileService;
import org.algorithm.algorithm.service.NotificationService;
import org.algorithm.algorithm.service.RankingService;
import org.algorithm.algorithm.util.Const;
import org.algorithm.algorithm.util.ErrorResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@ResponseBody
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/notification/{user_id}")
    public ResponseEntity<?> getNofitication(@PathVariable(value="user_id") Long userId,
                                             @RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                             @RequestParam(required = false, defaultValue = "10", value = "count") int count,
                                              HttpServletRequest request) throws BadRequestException {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            // 1 글 좋아요, 2 댓글 좋아요, 3 댓글 채택, 4 공지 사항 5 이벤트성 6 다른사람코드좋아요

            return ResponseEntity.ok(notificationService.getNotification(userId,page, count));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PostMapping("/notification/{target_id}")
    public ResponseEntity<?> postNotification(@PathVariable(value="target_id") Long targetId,
                                              @RequestParam(value = "targetType", required = true) Long targetType,
                                              @RequestParam(value = "notificationType", required = true) Long notificationType,
                                              HttpServletRequest request) throws BadRequestException {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            // 1 글 좋아요, 2 댓글 좋아요, 3 댓글 채택, 4 공지 사항 5 이벤트성 6 다른사람코드좋아요

            return ResponseEntity.ok(notificationService.postNotification(targetId, targetType,notificationType, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @DeleteMapping("/notification/{notification_id}")
    public ResponseEntity<?> postNotification(@PathVariable(value="notification_id") Long notificationId,
                                              HttpServletRequest request) throws BadRequestException {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            // 1 글 좋아요, 2 댓글 좋아요, 3 댓글 채택, 4 공지 사항 5 이벤트성 6 다른사람코드좋아요

            return ResponseEntity.ok(notificationService.deleteNotification(notificationId, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }
}
