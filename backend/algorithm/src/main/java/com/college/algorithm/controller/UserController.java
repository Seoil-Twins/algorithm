package com.college.algorithm.controller;

import com.college.algorithm.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@ResponseBody
public class UserController {
    private final UserService userService;

    @GetMapping(value = "/{userId}")
    public ResponseEntity<?> getTest(
            @PathVariable("userId") long userId
    ) {
        return ResponseEntity.ok().body(userService.getUser(userId));
    }
}
