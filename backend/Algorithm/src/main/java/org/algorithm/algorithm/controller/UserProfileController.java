package org.algorithm.algorithm.controller;

import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.service.UserProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@ResponseBody
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @PostMapping("/user/profile")
    public ResponseEntity<HttpStatus> handleFileUpload(@RequestParam("image") MultipartFile file,
                                                       @RequestParam("userId") long userId) {
        userProfileService.store(file,userId,"board/4");
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

}
