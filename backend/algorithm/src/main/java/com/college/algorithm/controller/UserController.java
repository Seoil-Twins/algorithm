package com.college.algorithm.controller;

import com.college.algorithm.dto.*;
import com.college.algorithm.entity.AppUser;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.service.UserService;
import com.college.algorithm.type.BoardType;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@ResponseBody
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getMyInfo(final HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return ResponseEntity.ok().body(userService.getMyInfo(userId));
    }

    @GetMapping(value = "/{userId}")
    public ResponseEntity<?> getUser(
            @PathVariable("userId") long userId
    ) {
        return ResponseEntity.ok().body(userService.getUser(userId));
    }

    @GetMapping(value = "/link")
    public ResponseEntity<?> getLink(final HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        ResponseUserLinkDto dto = userService.getLink(userId);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/try")
    public ResponseEntity<?> getMyAlgorithmHistory(final HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        ResponseMyAlgorithmDto dto = userService.getMyAlgorithmHistory(userId);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/notification")
    public ResponseEntity<?> getNotificationSettings(final HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        ResponseNotificationSettingsDto dto = userService.getNotificationSettings(userId);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{userId}/question")
    public ResponseEntity<?> getMyQuestion(
            @PathVariable("userId") long userId,
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @RequestParam(value = "count", defaultValue = "5", required = false) int count
    ) {
        List<String> boardTypes = List.of(
                com.college.algorithm.type.BoardType.GENERAL_QUESTION.getTypeName(),
                com.college.algorithm.type.BoardType.ALGORITHM_QUESTION.getTypeName()
        );
        ResponseMyBoardHistoryDto dto = userService.getMyHistory(userId, page, count, boardTypes);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{userId}/feedback")
    public ResponseEntity<?> getMyFeedback(
            @PathVariable("userId") long userId,
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @RequestParam(value = "count", defaultValue = "5", required = false) int count
    ) {
        List<String> boardTypes = List.of(
                BoardType.ALGORITHM_FEEDBACK.getTypeName()
        );
        ResponseMyBoardHistoryDto dto = userService.getMyHistory(userId, page, count, boardTypes);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{userId}/free")
    public ResponseEntity<?> getMyFree(
            @PathVariable("userId") long userId,
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @RequestParam(value = "count", defaultValue = "5", required = false) int count
    ) {
        List<String> boardTypes = List.of(
                BoardType.GENERAL_FREE.getTypeName()
        );
        ResponseMyBoardHistoryDto dto = userService.getMyHistory(userId, page, count, boardTypes);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody RequestLoginDto dto, final HttpServletRequest request) {
        final Long userId = userService.login(dto);
        final HttpSession session = request.getSession();

        session.setAttribute("userId", userId);

        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<?> signup(@Valid @RequestBody RequestSignupDto dto) {
        userService.signup(dto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/link")
    public ResponseEntity<?> addLink(@Valid @RequestBody RequestLinkDto dto, final HttpServletRequest request) {
        final String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        userService.addLink(userId, dto);
        return ResponseEntity.noContent().build();
    }
}
