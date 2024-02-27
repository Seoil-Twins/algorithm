package org.algorithm.algorithm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.BoardDTO;
import org.algorithm.algorithm.dto.CommentDTO;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.exception.UpdateException;
import org.algorithm.algorithm.service.BoardService;
import org.algorithm.algorithm.service.UserService;
import org.algorithm.algorithm.util.Const;
import org.algorithm.algorithm.util.ErrorResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@ResponseBody
@RequiredArgsConstructor
public class BoardController {

    private final UserService userService;
    private final BoardService boardService;

    @GetMapping("/board")
    public ResponseEntity<?> getBoardAll(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                         @RequestParam(required = false, defaultValue = "10", value = "count") int count,
                                         @RequestParam(defaultValue = "1", value = "boardType") Long boardType,
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

    @PostMapping("/board")
    public ResponseEntity<?> postBoard(@RequestBody BoardDTO boardDTO,
                                       HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            if(boardDTO.getBoardType() != 2)
            {
                if(boardDTO.getAlgorithmId() == null)
                    return ResponseEntity.badRequest().body(
                            new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : require algorithm_id")
                    );
            }

            if(boardDTO.getBoardType() < 1 || boardDTO.getBoardType() > 4)
                return ResponseEntity.badRequest().body(
                        new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : board_type ( only 1,2,3,4 )")
                );

            if(boardDTO.getTitle() == null || boardDTO.getContent() == null)
                return ResponseEntity.badRequest().body(
                        new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : title and content not null")
                );

            boardService.postBoard(boardDTO, loginUser);

            return ResponseEntity.ok("created");
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }

    }

    @PostMapping("/board/comment/{board_id}")
    public ResponseEntity<?> postComment(@RequestBody CommentDTO commentDTO,
                                         @PathVariable(value="board_id") Long boardId,
                                         HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            if(commentDTO.getContent() == null)
                return ResponseEntity.badRequest().body(
                        new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : content require")
                );


            boardService.postComment(commentDTO, boardId, loginUser);

            return ResponseEntity.ok("created");
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PostMapping("/board/adopt/{board_id}/{comment_id}")
    public ResponseEntity<?> postAdopt(@PathVariable(value="board_id") Long boardId,
                                         @PathVariable(value="comment_id") Long commentId,
                                         HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {
            boardService.postAdopt(boardId,commentId, loginUser);

            return ResponseEntity.ok("created");
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PostMapping("/board/adopt-feedback/{board_id}")
    public ResponseEntity<?> postAdoptFeedback(@PathVariable(value="board_id") Long boardId,
                                       HttpServletRequest request) throws BadRequestException {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {
            boardService.postAdoptFeedback(boardId, loginUser);

            return ResponseEntity.ok("created");
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PatchMapping("/board/{board_id}")
    public ResponseEntity<Object> patchBoard(@PathVariable("board_id") Long boardId,
                                            @RequestBody BoardDTO boardDTO,
                                            HttpServletRequest request){

        if(boardDTO.getBoardType() == 2)
        {
            if(boardDTO.getAlgorithmId() != null)
                return ResponseEntity.badRequest().body(
                        new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : algorithm_id only board_type ( 1,3,4 )")
                );
        }

        if(boardDTO.getBoardType() < 1 || boardDTO.getBoardType() > 4)
            return ResponseEntity.badRequest().body(
                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : board_type ( only 1,2,3,4 )")
            );

        if(boardDTO.getTitle() == null || boardDTO.getContent() == null)
            return ResponseEntity.badRequest().body(
                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : title and content not null")
            );

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            boardService.patchBoard(boardDTO, boardId ,loginUser);

            return ResponseEntity.ok(HttpStatus.OK);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PatchMapping("/board/comment/{comment_id}")
    public ResponseEntity<Object> patchComment(@PathVariable("comment_id") Long commentId,
                                            @RequestBody CommentDTO commentDTO,
                                            HttpServletRequest request){

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            boardService.patchComment(commentDTO, commentId ,loginUser);

            return ResponseEntity.ok(HttpStatus.OK);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @DeleteMapping("/board/{board_id}")
    public ResponseEntity<?> deleteBoard(@PathVariable(value = "board_id") Long boardId,
                                              HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            HttpStatus result = boardService.deleteBoard(boardId, loginUser);
            return ResponseEntity.status(result).body(result.value());
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }

    @DeleteMapping("/board/comment/{comment_id}")
    public ResponseEntity<?> deleteComment(@PathVariable(value = "comment_id") Long commentId,
                                         HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            HttpStatus result = boardService.deleteComment(commentId, loginUser);
            return ResponseEntity.status(result).body(result.value());
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }


}
