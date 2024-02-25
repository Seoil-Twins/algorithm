package org.algorithm.algorithm.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.service.FileService;
import org.algorithm.algorithm.service.RankingService;
import org.algorithm.algorithm.service.RecommendService;
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
public class RecommendController {

    private final RecommendService recommendService;

    @PostMapping("/recommend/board/{board_id}")
    public ResponseEntity<?> postRecommendBoard(@PathVariable("board_id") Long boardId,
                                        @RequestParam(required = false, value = "value") Boolean value,
                                        HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;

        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            return ResponseEntity.status(HttpStatus.CREATED).body(recommendService.postBoardRecommend(boardId, value, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PostMapping("/recommend/comment/{comment_id}")
    public ResponseEntity<?> postRecommendComment(@PathVariable("comment_id") Long commentId,
                                                @RequestParam(required = false, value = "value") Boolean value,
                                                HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;

        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            return ResponseEntity.status(HttpStatus.CREATED).body(recommendService.postCommentRecommend(commentId, value, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PostMapping("/recommend/comment-code/{comment_code_id}")
    public ResponseEntity<?> postRecommendCommentCode(@PathVariable("comment_code_id") Long commentCodeId,
                                                  @RequestParam(required = false, value = "value") Boolean value,
                                                  HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;

        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            return ResponseEntity.status(HttpStatus.CREATED).body(recommendService.postCommentCodeRecommend(commentCodeId, value, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @DeleteMapping("/recommend/board/{board_id}")
    public ResponseEntity<?> deleteRecommendBoard(@PathVariable("board_id") Long boardId,
                                        HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;

        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            return ResponseEntity.ok(recommendService.deleteBoard(boardId, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @DeleteMapping("/recommend/comment/{comment_id}")
    public ResponseEntity<?> deleteRecommendComment(@PathVariable("comment_id") Long commentId,
                                                  HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;

        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            return ResponseEntity.ok(recommendService.deleteComment(commentId, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @DeleteMapping("/recommend/comment-code/{comment_code_id}")
    public ResponseEntity<?> deleteRecommendCommentCode(@PathVariable("comment_code_id") Long commentCodeId,
                                                  HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;

        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            return ResponseEntity.ok(recommendService.deleteCommentCode(commentCodeId, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }
}



//@RequestParam(required = false, defaultValue = "1", value = "page") int page,
//                                        @RequestParam(required = false, defaultValue = "10", value = "count") int count