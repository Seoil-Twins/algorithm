package org.algorithm.algorithm.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.service.FavoriteService;
import org.algorithm.algorithm.service.FileService;
import org.algorithm.algorithm.service.RankingService;
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
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping("/favorite")
    public ResponseEntity<?> getRanking(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                        @RequestParam(required = false, defaultValue = "10", value = "count") int count) {

        ObjectNode result = favoriteService.getFavorites(page, count);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/favorite/board/{board_id}")
    public ResponseEntity<?> getIsFavoriteBoard(@PathVariable("board_id") Long boardId, HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            Boolean result = favoriteService.getIsFavoriteBoard(boardId, loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @GetMapping("/favorite/algorithm/{algorithm_id}")
    public ResponseEntity<?> getIsFavoriteAlgorithm(@PathVariable("algorithm_id") Long algorithmId, HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            Boolean result = favoriteService.getIsFavoriteAlgorithm(algorithmId, loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @GetMapping("/favorite/comment/{comment_id}")
    public ResponseEntity<?> getIsFavoriteComment(@PathVariable("comment_id") Long commentId, HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            Boolean result = favoriteService.getIsFavoriteComment(commentId, loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @GetMapping("/favorite/code/{code_id}")
    public ResponseEntity<?> getIsFavoriteCode(@PathVariable("code_id") Long codeId, HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            Boolean result = favoriteService.getIsFavoriteCode(codeId, loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PostMapping("/favorite/algorithm/{algorithm_id}")
    public ResponseEntity<?> postFavorite(@PathVariable("algorithm_id") Long algorithmId, HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            HttpStatus result = favoriteService.postFavorite(algorithmId, loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @DeleteMapping("/favorite/algorithm/{algorithm_id}")
    public ResponseEntity<?> deleteFavorite(@PathVariable("algorithm_id") Long algorithmId, HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            HttpStatus result = favoriteService.deleteFavorite(algorithmId, loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

}


