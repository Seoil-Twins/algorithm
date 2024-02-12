package org.algorithm.algorithm.controller;

import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.service.UserProfileService;
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
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/display")
    public ResponseEntity<Resource> display(@Param("filename") String filename) {
        String path = "D:/Github/algorithm/backend/Algorithm/src/images/";
        Resource resource = new FileSystemResource(path + filename);
        if (!resource.exists())
            return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);

        HttpHeaders header = new HttpHeaders();
        Path filePath = null;

        try {
            filePath = Paths.get(path + filename);
            header.add("Content-Type", Files.probeContentType(filePath));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }
    @PostMapping("/user/profile")
    public ResponseEntity<HttpStatus> handleFileUpload(@RequestParam("image") MultipartFile file,
                                                       @RequestParam("userId") long userId) {
        userProfileService.store(file,userId,"user/"+userId);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

}
