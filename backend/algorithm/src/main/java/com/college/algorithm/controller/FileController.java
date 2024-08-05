package com.college.algorithm.controller;

import io.lettuce.core.dynamic.annotation.Param;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@RestController
@RequiredArgsConstructor
@ResponseBody
public class FileController {
    @Value("${upload.dir}")
    private String directoryPath;

    @GetMapping("/display")
    public ResponseEntity<?> display(@Param("filename") String filename) {
        Resource resource = new FileSystemResource(directoryPath + filename);
        if (!resource.exists()) { return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND); }

        HttpHeaders header = new HttpHeaders();
        Path filePath = Paths.get(directoryPath + filename);

        try {
            header.add("Content-Type", Files.probeContentType(filePath));
        } catch (IOException e) {
            log.warn("display 메소드 : 파일을 찾을 수 없습니다.\n경로 : " + directoryPath + filename);
        }

        return new ResponseEntity<>(resource, header, HttpStatus.OK);
    }
}
