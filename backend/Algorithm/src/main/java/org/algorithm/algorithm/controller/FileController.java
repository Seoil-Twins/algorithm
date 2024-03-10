package org.algorithm.algorithm.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.service.FileService;
import org.algorithm.algorithm.util.Const;
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
                                              @PathVariable("board_id") long boardId,
                                              HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {
            return ResponseEntity.ok(fileService.storeBoardImage(file,boardId,"board/" + boardId,loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PostMapping("/board/image/")
    public ResponseEntity<?> handleBoardImageTemp(@RequestParam("image") MultipartFile file,
                                              HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {
            return ResponseEntity.ok(fileService.storeBoardImageTemp(file,"board/temp/" + loginUser.getUserId(), loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PatchMapping("/board/image/{board_id}")
    public ResponseEntity<?> handlePatchBoardImage(@PathVariable("board_id") long boardId,
                                              HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {
            return ResponseEntity.ok(fileService.patchImage(boardId,loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }


    @DeleteMapping("/board/image/delete/{board_image_id}")
    public ResponseEntity<HttpStatus> handleDeleteBoardImage(@PathVariable("board_image_id") long boardImageId) {
        fileService.deleteBoardImage(boardImageId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}


