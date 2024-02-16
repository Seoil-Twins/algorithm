package org.algorithm.algorithm.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.AlgorithmRequestDTO;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.service.BoardService;
import org.algorithm.algorithm.service.UserProfileService;
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
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/board")
    public ResponseEntity<?> getBoardAll(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                         @RequestParam(required = false, defaultValue = "10", value = "count") int count,
                                         @RequestParam(defaultValue = "1", value = "board_type") Long boardType,
                                         HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        return ResponseEntity.status(HttpStatus.OK).body(boardService.getAll(page, count, boardType, loginUser));

    }

    @GetMapping("/board/{board_id}")
    public ResponseEntity<?> getBoardAll(@PathVariable(value="board_id") int boardId,
                                         HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        return ResponseEntity.status(HttpStatus.OK).body(boardService.getBoardDetail(boardId, loginUser));
    }

    @GetMapping("/board/recommended")
    public ResponseEntity<?> getRecommended(HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        return ResponseEntity.status(HttpStatus.OK).body(boardService.getRecommended(loginUser));
    }

    @GetMapping("/board/comment/{board_id}")
    public ResponseEntity<?> getComments(@PathVariable(value="board_id") int boardId,
                                         HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        return ResponseEntity.status(HttpStatus.OK).body(boardService.getComments(boardId, loginUser));
    }

    @GetMapping("/board/algorithm/{algorithm_id}")
    public ResponseEntity<?> getBoardByAlgorithmId(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                                   @RequestParam(required = false, defaultValue = "10", value = "count") int count,
                                                   @PathVariable(value="algorithm_id") Long algorithmId,
                                                   @RequestParam(defaultValue = "6", value = "boardType") Long boardType,
                                                   HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        return ResponseEntity.status(HttpStatus.OK).body(boardService.getBoardByAlgorithmId(page, count, algorithmId, boardType, loginUser));
    }


}
