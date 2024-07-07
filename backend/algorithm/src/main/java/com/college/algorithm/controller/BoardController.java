package com.college.algorithm.controller;

import com.college.algorithm.dto.*;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.service.BoardService;
import com.college.algorithm.type.BoardType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@ResponseBody
@RequestMapping("/board")
@RequiredArgsConstructor
@Validated
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/")
    public ResponseEntity<?> getBoards(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                       @RequestParam(required = false, defaultValue = "10", value = "count") int count,
                                       @RequestParam(required = false, value = "boardType") String boardType, /* p : 일반 전체
                                                                                                                pq : 일반 질문
                                                                                                               pf : 일반 자유
                                                                                                               a : 알고리즘 전체
                                                                                                               aq : 알고리즘 질문
                                                                                                               af : 알고리즘 피드백*/
                                       @RequestParam(required = false, value = "keyword") String keyword,
                                       HttpServletRequest request){
        boolean paramFlag = Arrays.stream(BoardType.values())
                .anyMatch(type -> boardType.equals(type.getSearchParam()));
        if(!paramFlag)
            throw new CustomException(ErrorCode.BAD_REQUEST_SEARCH);
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);
        if(keyword==null)
            keyword="";

        return ResponseEntity.status(HttpStatus.OK).body(boardService.getBoards(page,count,boardType,keyword,loginUserId));
    }

    @GetMapping("/kind")
    public ResponseEntity<?> getKinds() {
        return ResponseEntity.status(HttpStatus.OK).body(boardService.getKinds());
    }

    @GetMapping("/{board_id}")
    public ResponseEntity<?> getBoardDetail(@PathVariable(value = "board_id") Long boardId,
                                       HttpServletRequest request){

//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(HttpStatus.OK).body(boardService.getBoardDetail(boardId,loginUserId));
    }

    @GetMapping("/recommend")
    public ResponseEntity<?> getSuggests() {
        return ResponseEntity.status(HttpStatus.OK).body(boardService.getSuggestBoards());
    }

    @GetMapping("/{board_id}/comment")
    public ResponseEntity<?> getBoardComments(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                              @RequestParam(required = false, defaultValue = "10", value = "count") int count,
                                              @PathVariable(value = "board_id") Long boardId){
        return ResponseEntity.status(HttpStatus.OK).body(boardService.getBoardComments(page,count,boardId));
    }

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> postBoardImage(@Valid @ModelAttribute RequestBoardImageDto dto,
                                            HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.ok().body(boardService.postBoardImage(dto,loginUserId));
    }
    @PostMapping("/")
    public ResponseEntity<?> postBoard(@Valid @RequestBody(required = false) RequestBoardPostDto dto,
                                        HttpServletRequest request){

//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(HttpStatus.OK).body(boardService.postBoard(dto,loginUserId));
    }

    @PostMapping("/{board_id}/recommend")
    public ResponseEntity<?> postBoardRecommend(@PathVariable(value = "board_id") Long board_id,
                                                           HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(boardService.postBoardRecommend(board_id,loginUserId)).build();
    }

    @PostMapping("/{board_id}/comment")
    public ResponseEntity<?> postBoardComment(@RequestBody(required = false) RequestBoardComment requestBoardComment,
                                                         @PathVariable(value = "board_id") Long board_id,
                                                         HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(boardService.postBoardComment(board_id,requestBoardComment,loginUserId)).build();
    }

    @PostMapping("/{board_id}/comment/{comment_id}/adopt")
    public ResponseEntity<?> postAdopt(@PathVariable(value = "board_id") Long board_id,
                                       @PathVariable(value = "comment_id") Long comment_id,
                                              HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(boardService.postBoardAdopt(board_id,comment_id,loginUserId)).build();
    }

    @PatchMapping("/{board_id}")
    public ResponseEntity<?> patchBoard(@RequestBody(required = false) RequestBoardUpdateDto boardUpdateDto,
                                        @PathVariable(value = "board_id") Long boardId,
                                            HttpServletRequest request){

//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(HttpStatus.OK).body(boardService.patchBoard(boardUpdateDto,boardId,loginUserId));
    }

    @DeleteMapping("/{board_id}/recommend")
    public ResponseEntity<?> deleteBoardRecommend(@PathVariable(value = "board_id") Long board_id,
                                                           HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(boardService.deleteBoardRecommend(board_id,loginUserId)).build();
    }

    @DeleteMapping("/{board_id}")
    public ResponseEntity<?> deleteBoard(@PathVariable(value = "board_id") Long board_id,
                                                  HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(boardService.deleteBoard(board_id,loginUserId)).build();
    }

}
