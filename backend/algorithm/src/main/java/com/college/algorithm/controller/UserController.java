package com.college.algorithm.controller;

import com.college.algorithm.dto.*;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.service.UserService;
import com.college.algorithm.type.BoardType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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
        Object userId = request.getSession().getAttribute("userId");
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return ResponseEntity.ok().body(userService.getMyInfo(Long.parseLong(userId.toString())));
    }

    @GetMapping(value = "/{userId}")
    public ResponseEntity<?> getUser(
            @PathVariable("userId") long userId
    ) {
        return ResponseEntity.ok().body(userService.getUser(userId));
    }

    @GetMapping(value = "/link")
    public ResponseEntity<?> getLinks(final HttpServletRequest request) {
        Object userId = request.getSession().getAttribute("userId");
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        ResponseUserLinkDto dto = userService.getLinks(Long.parseLong(userId.toString()));
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/try")
    public ResponseEntity<?> getMyAlgorithms(final HttpServletRequest request) {
        Object userId = request.getSession().getAttribute("userId");
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        ResponseMyAlgorithmDto dto = userService.getMyAlgorithms(Long.parseLong(userId.toString()));
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/notification")
    public ResponseEntity<?> getNotificationSettings(final HttpServletRequest request) {
        Object userId = request.getSession().getAttribute("userId");
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        ResponseNotificationSettingsDto dto = userService.getNotificationSettings(Long.parseLong(userId.toString()));
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{userId}/question")
    public ResponseEntity<?> getMyQuestions(
            @PathVariable("userId") long userId,
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @RequestParam(value = "count", defaultValue = "5", required = false) int count
    ) {
        List<String> boardTypes = List.of(
                com.college.algorithm.type.BoardType.GENERAL_QUESTION.getTypeName(),
                com.college.algorithm.type.BoardType.ALGORITHM_QUESTION.getTypeName()
        );
        ResponseMyBoardDto dto = userService.getMyHistories(userId, page, count, boardTypes);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{userId}/feedback")
    public ResponseEntity<?> getMyFeedbacks(
            @PathVariable("userId") long userId,
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @RequestParam(value = "count", defaultValue = "5", required = false) int count
    ) {
        List<String> boardTypes = List.of(
                BoardType.ALGORITHM_FEEDBACK.getTypeName()
        );
        ResponseMyBoardDto dto = userService.getMyHistories(userId, page, count, boardTypes);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{userId}/free")
    public ResponseEntity<?> getMyFrees(
            @PathVariable("userId") long userId,
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @RequestParam(value = "count", defaultValue = "5", required = false) int count
    ) {
        List<String> boardTypes = List.of(
                BoardType.GENERAL_FREE.getTypeName()
        );
        ResponseMyBoardDto dto = userService.getMyHistories(userId, page, count, boardTypes);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{userId}/answer")
    public ResponseEntity<?> getMyAdopts(
            @PathVariable("userId") long userId,
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @RequestParam(value = "count", defaultValue = "5", required = false) int count
    ) {
        ResponseMyCommentDto dto = userService.getMyAdopts(userId, page, count);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{userId}/comment")
    public ResponseEntity<?> getMyComments(
            @PathVariable("userId") long userId,
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @RequestParam(value = "count", defaultValue = "5", required = false) int count
    ) {
        ResponseMyCommentDto dto = userService.getMyComments(userId, page, count);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{userId}/recommend")
    public ResponseEntity<?> getMyRecommends(
            @PathVariable("userId") long userId,
            @RequestParam(value = "page", defaultValue = "1", required = false) int page,
            @RequestParam(value = "count", defaultValue = "5", required = false) int count
    ) {
        ResponseMyBoardDto dto = userService.getMyRecommends(userId, page, count);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody RequestLoginDto dto, final HttpServletRequest request) {
        final Long userId = userService.login(dto);
        final HttpSession session = request.getSession();

        session.setAttribute("userId", userId);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(final HttpServletRequest request) {
        request.getSession().invalidate();
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<?> signup(@Valid @RequestBody RequestSignupDto dto) {
        userService.signup(dto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/verify/send")
    public ResponseEntity<?> sendEmail(@Valid @RequestBody RequestSendEmailDto dto) {
        userService.sendEmail(dto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/verify/compare")
    public ResponseEntity<?> compareVerifyCode(@Valid @RequestBody RequestCompareVerifycodeDto dto) {
        userService.compareVerifyCode(dto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/link")
    public ResponseEntity<?> addLink(@Valid @RequestBody RequestLinkDto dto, final HttpServletRequest request) {
        final Object userId = request.getSession().getAttribute("userId");
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        userService.addLink(Long.parseLong(userId.toString()), dto);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping
    public ResponseEntity<?> updateNickname(@Valid @RequestBody RequestUpdateProfileDto dto, final  HttpServletRequest request) {
        final Object userId = request.getSession().getAttribute("userId");
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        userService.updateProfile(Long.parseLong(userId.toString()), dto);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProfile(@Valid @ModelAttribute RequestProfileDto dto, final  HttpServletRequest request) {
        final Object userId = request.getSession().getAttribute("userId");
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        userService.updateProfile(Long.parseLong(userId.toString()), dto);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/notification")
    public ResponseEntity<?> updateNotification(@Valid @RequestBody RequestNotificationDto dto, final HttpServletRequest request) {
        final Object userId = request.getSession().getAttribute("userId");
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        userService.updateNotification(Long.parseLong(userId.toString()), dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(final HttpServletRequest request) {
        final Object userId = request.getSession().getAttribute("userId");
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        userService.deleteUser(Long.parseLong(userId.toString()));
        request.getSession().invalidate();

        return ResponseEntity.noContent().build();
    }
}
