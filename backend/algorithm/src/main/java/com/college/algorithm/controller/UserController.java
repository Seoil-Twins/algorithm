package com.college.algorithm.controller;

import com.college.algorithm.dto.RequestLoginDto;
import com.college.algorithm.dto.RequestSignupDto;
import com.college.algorithm.entity.AppUser;
import com.college.algorithm.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@ResponseBody
public class UserController {
    private final UserService userService;

    @GetMapping(value = "/{userId}")
    public ResponseEntity<?> getUser(
            @PathVariable("userId") long userId
    ) {
        return ResponseEntity.ok().body(userService.getUser(userId));
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
}
