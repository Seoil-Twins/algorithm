package com.college.algorithm.controller;

import com.college.algorithm.dto.*;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.service.BoardService;
import com.college.algorithm.type.BoardTypeWithSearchParam;
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

    @GetMapping
    public ResponseEntity<?> getBoards(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                       @RequestParam(required = false, defaultValue = "10", value = "count") int count,
                                       @RequestParam(required = false, value = "boardType") String boardType, /* p : 일반 전체
                                                                                                                pq : 일반 질문
                                                                                                               pf : 일반 자유
                                                                                                               a : 알고리즘 전체
                                                                                                               aq : 알고리즘 질문
                                                                                                               af : 알고리즘 피드백*/
                                       @RequestParam(required = false, value = "keyword") String keyword,
                                       @RequestParam(required = false, value = "algorithmId") Long algorithmId,
                                       HttpServletRequest request){
        boolean paramFlag = Arrays.stream(BoardTypeWithSearchParam.values())
                .anyMatch(type -> boardType.equals(type.getSearchParam()));
        if(!paramFlag)
            throw new CustomException(ErrorCode.BAD_REQUEST_SEARCH);

        if(keyword==null)
            keyword="";

        String userId = request.getSession().getAttribute("userId").toString();

        return ResponseEntity.status(HttpStatus.OK).body(boardService.getBoards(page, count, boardType, keyword, Long.parseLong(userId), algorithmId));
    }

    @GetMapping("/kind")
    public ResponseEntity<?> getKinds() {
        return ResponseEntity.status(HttpStatus.OK).body(boardService.getKinds());
    }

    @GetMapping("/{board_id}")
    public ResponseEntity<?> getBoardDetail(@PathVariable(value = "board_id") Long boardId,
                                       HttpServletRequest request){

        String userId = request.getSession().getAttribute("userId").toString();
        return ResponseEntity.status(HttpStatus.OK).body(boardService.getBoardDetail(boardId, Long.parseLong(userId)));
    }

    @GetMapping("/{board_id}/update")
    public ResponseEntity<?> getUpdateBoardDetail(@PathVariable(value = "board_id") Long boardId,
                                        HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        return ResponseEntity.status(HttpStatus.OK).body(boardService.getUpdateBoardDetail(boardId, Long.parseLong(userId)));
    }

    @GetMapping("/recommend")
    public ResponseEntity<?> getSuggests() {
        return ResponseEntity.status(HttpStatus.OK).body(boardService.getSuggestBoards());
    }

    @GetMapping("/{board_id}/comment")
    public ResponseEntity<?> getBoardComments(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                              @RequestParam(required = false, defaultValue = "10", value = "count") int count,
                                              @PathVariable(value = "board_id") Long boardId,
                                              HttpServletRequest request){
        String userId = request.getSession().getAttribute("userId").toString();
        return ResponseEntity.status(HttpStatus.OK).body(boardService.getBoardComments(page, count, boardId, Long.parseLong(userId)));
    }

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> postBoardImage(@Valid @ModelAttribute RequestBoardImageDto dto,
                                            HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return ResponseEntity.ok().body(boardService.postBoardImage(dto, Long.parseLong(userId)));
    }
    @PostMapping("/")
    public ResponseEntity<?> postBoard(@Valid @RequestBody(required = false) RequestBoardPostDto dto,
                                        HttpServletRequest request){

        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return ResponseEntity.status(HttpStatus.OK).body(boardService.postBoard(dto, Long.parseLong(userId)));
    }

    @PostMapping("/{board_id}/recommend")
    public ResponseEntity<?> postBoardRecommend(@PathVariable(value = "board_id") Long board_id,
                                                           HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return ResponseEntity.status(boardService.postBoardRecommend(board_id, Long.parseLong(userId))).build();
    }

    @PostMapping("/{board_id}/comment")
    public ResponseEntity<?> postBoardComment(@Valid @RequestBody(required = false) RequestBoardComment requestBoardComment,
                                                         @PathVariable(value = "board_id") Long board_id,
                                                         HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return ResponseEntity.status(boardService.postBoardComment(board_id,requestBoardComment, Long.parseLong(userId))).build();
    }

    @PostMapping("/{board_id}/comment/{comment_id}/adopt")
    public ResponseEntity<?> postAdopt(@PathVariable(value = "board_id") Long board_id,
                                       @PathVariable(value = "comment_id") Long comment_id,
                                              HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return ResponseEntity.status(boardService.postBoardAdopt(board_id,comment_id, Long.parseLong(userId))).build();
    }

    @PostMapping("/{board_id}/view")
    public ResponseEntity<?> postView(@PathVariable(value = "board_id") Long board_id,
                                       HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return ResponseEntity.status(boardService.postBoardView(board_id, Long.parseLong(userId))).build();
    }

    @PatchMapping("/{board_id}")
    public ResponseEntity<?> patchBoard(@Valid @RequestBody(required = false) RequestBoardUpdateDto boardUpdateDto,
                                        @PathVariable(value = "board_id") Long boardId,
                                            HttpServletRequest request){
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return ResponseEntity.status(HttpStatus.OK).body(boardService.patchBoard(boardUpdateDto, boardId, Long.parseLong(userId)));
    }

    @DeleteMapping("/{board_id}/recommend")
    public ResponseEntity<?> deleteBoardRecommend(@PathVariable(value = "board_id") Long board_id,
                                                           HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return ResponseEntity.status(boardService.deleteBoardRecommend(board_id, Long.parseLong(userId))).build();
    }

    @DeleteMapping("/{board_id}")
    public ResponseEntity<?> deleteBoard(@PathVariable(value = "board_id") Long board_id,
                                                  HttpServletRequest request) {
        String userId = request.getSession().getAttribute("userId").toString();
        if (userId == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return ResponseEntity.status(boardService.deleteBoard(board_id, Long.parseLong(userId))).build();
    }

}
