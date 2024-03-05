package org.algorithm.algorithm.controller;

import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.service.FileService;
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
public class FileController {

    private final FileService fileService;

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
    @PatchMapping("/user/profile/{user_id}")
    public ResponseEntity<?> handleFileUpload(@RequestParam("image") MultipartFile file,
                                                       @PathVariable("user_id") long userId) {
        return ResponseEntity.ok(fileService.store(file,userId,"user/"+userId));
    }

    @PostMapping("/board/image/{board_id}")
    public ResponseEntity<?> handleBoardImage(@RequestParam("image") MultipartFile file,
                                                       @PathVariable("board_id") long boardId) {

        return ResponseEntity.ok(fileService.storeBoardImage(file,boardId,"board/"+boardId));
    }


    @DeleteMapping("/board/image/delete/{board_image_id}")
    public ResponseEntity<HttpStatus> handleDeleteBoardImage(@PathVariable("board_image_id") long boardImageId) {
        fileService.deleteBoardImage(boardImageId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}


