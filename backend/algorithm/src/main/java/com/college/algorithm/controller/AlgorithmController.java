package com.college.algorithm.controller;

import com.college.algorithm.dto.*;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.service.AlgorithmService;
import com.college.algorithm.type.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@ResponseBody
@RequiredArgsConstructor
@Validated
public class AlgorithmController {

    private final AlgorithmService algorithmService;

    @GetMapping("/algorithm")
    public ResponseEntity<?> getAllAlgorithm(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                             @RequestParam(required = false, defaultValue = "10", value = "count") int count,
                                             @RequestParam(required = false, defaultValue = "a", value = "solved") String solved, // a : 전체, s : 푼 문제, ns : 안푼 문제
                                             @RequestParam(required = false, defaultValue = "r", value = "sort") String sort, // r : 최신순, or : 오래된순, t : 시도순
                                             @RequestParam(required = false, defaultValue = "-1", value = "level") String level, // -1은 전체, 0~5
                                             @RequestParam(required = false, value = "rate") String rate, // h : 정답률 높은 순, l = 정답률 낮은 순
                                             @RequestParam(required = false, value = "tag") String tag, // 1~14
                                             @RequestParam(required = false, value = "keyword") String keyword,
                                             HttpServletRequest request) {
        boolean paramChecker = Arrays.stream(LevelRange.values())
                .anyMatch(type -> level.equals(type.getLevel()));
        if(!paramChecker)
            throw new CustomException(ErrorCode.BAD_REQUEST_SEARCH);

        paramChecker = Arrays.stream(SortType.values())
                .anyMatch(type -> sort.equalsIgnoreCase(type.getSort()));
        if(!paramChecker)
            throw new CustomException(ErrorCode.BAD_REQUEST_SEARCH);

        paramChecker = Arrays.stream(SolvedCheck.values())
                .anyMatch(type -> solved.equalsIgnoreCase(type.getSolved()));
        if(!paramChecker)
            throw new CustomException(ErrorCode.BAD_REQUEST_SEARCH);


        if(rate != null) {
            paramChecker = Arrays.stream(RateOrder.values())
                    .anyMatch(type -> rate.equalsIgnoreCase(type.getRate()));
            if (!paramChecker)
                throw new CustomException(ErrorCode.BAD_REQUEST_SEARCH);
        }

        if (tag != null) {
            paramChecker = Arrays.stream(AlgorithmTag.values())
                    .anyMatch(type -> tag.equalsIgnoreCase(type.getTag()));
            if (!paramChecker)
                throw new CustomException(ErrorCode.BAD_REQUEST_SEARCH);
        }


        AlgorithmSearchRequestDto algorithmRequestDTO = new AlgorithmSearchRequestDto(page,count,solved.toLowerCase(),sort.toLowerCase(),level,rate,tag,keyword);

        HttpSession session = request.getSession(false); // default true
        Long loginUserId = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUserId = (Long)session.getAttribute("로그인 암호 키 무언가");
            if(loginUserId == null)
                throw new CustomException(ErrorCode.INVALID_COOKIE);
        } else{
            // 무언가 오류처리
        }

        return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getAll(algorithmRequestDTO, loginUserId));

    }

    @GetMapping("/algorithm/recommend")
    public ResponseEntity<?> getSuggestAlgorithm() {
        ResponseAlgorithmSuggestDto response = algorithmService.getSuggestAlgorithms();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @GetMapping("/algorithm/{algorithm_id}")
    public ResponseEntity<?> getAlgorithmDetail(@PathVariable(value = "algorithm_id") Long algorithm_id,
                                                HttpServletRequest request) {
        Long loginUserId = (Long) request.getAttribute("유저유저키키");
        AlgorithmDetailDto response = algorithmService.getAlgorithmDetail(algorithm_id,1L);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/algorithm/{algorithm_id}/explanation")
    public ResponseEntity<?> getExplanation(@PathVariable(value = "algorithm_id") Long algorithm_id,
                                            HttpServletRequest request) {
        Long loginUserId = (Long) request.getAttribute("유저유저키키");
        ExplanationResponseDto response = algorithmService.getExplanation(algorithm_id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/algorithm/kind")
    public ResponseEntity<?> getKinds() {
        ResponseAlgorithmKindDto response = algorithmService.getKinds();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/algorithm/{algorithm_id}/correct")
    public ResponseEntity<?> getAlgorithmCorrect(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                                 @RequestParam(required = false, defaultValue = "10", value = "count") int count,
                                                 @PathVariable(value = "algorithm_id") Long algorithm_id) {
        ResponseCorrectDto response = algorithmService.getCorrects(algorithm_id,page,count);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/algorithm/{algorithm_id}/correct/{correct_id}/comment")
    public ResponseEntity<?> getAlgorithmCorrectComment(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                                 @RequestParam(required = false, defaultValue = "10", value = "count") int count,
                                                 @PathVariable(value = "algorithm_id") Long algorithm_id,
                                                    @PathVariable(value = "correct_id") Long correct_id) {
        ResponseCorrectCommentDto response = algorithmService.getCorrectComments(correct_id,page,count);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/algorithm/{algorithm_id}")
    public ResponseEntity<?> postCode(@Valid @RequestBody RequestCodeDto dto,
                                      @PathVariable(value = "algorithm_id") Long algorithm_id,
                                      HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.ok().body(algorithmService.postCode(dto,algorithm_id,loginUserId));
    }

    @PostMapping("/algorithm/{algorithm_id}/correct/{correct_id}/comment")
    public ResponseEntity<?> postAlgorithmCorrectComment(@Valid @RequestBody(required = false) RequestCorrectComment requestCorrectComment,
                                                        @PathVariable(value = "algorithm_id") Long algorithm_id,
                                                        @PathVariable(value = "correct_id") Long correct_id,
                                                        HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(algorithmService.postCorrectComment(correct_id,requestCorrectComment,loginUserId)).build();
    }

    @PostMapping("/algorithm/{algorithm_id}/correct/{correct_id}/recommend")
    public ResponseEntity<?> postAlgorithmCorrectRecommend(@PathVariable(value = "algorithm_id") Long algorithm_id,
                                                         @PathVariable(value = "correct_id") Long correct_id,
                                                         HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(algorithmService.postCorrectRecommend(correct_id,loginUserId)).build();
    }

    @PostMapping("/algorithm/{algorithm_id}/recommend")
    public ResponseEntity<?> postAlgorithmRecommend(@PathVariable(value = "algorithm_id") Long algorithm_id,
                                                           HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(algorithmService.postAlgorithmRecommend(algorithm_id,loginUserId)).build();
    }

    @PostMapping("/algorithm/{algorithm_id}/board")
    public ResponseEntity<?> postAlgorithmBoard(@Valid @RequestBody(required = false) RequestAlgorithmPostDto dto,
                                       @PathVariable(value = "algorithm_id") Long algorithm_id,
                                       HttpServletRequest request){

//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(HttpStatus.OK).body(algorithmService.postAlgorithmBoard(dto,algorithm_id, loginUserId));
    }

    @DeleteMapping("/algorithm/{algorithm_id}/correct/{correct_id}/recommend")
    public ResponseEntity<?> deleteAlgorithmCorrectRecommend(@PathVariable(value = "algorithm_id") Long algorithm_id,
                                                           @PathVariable(value = "correct_id") Long correct_id,
                                                           HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(algorithmService.deleteCorrectRecommend(correct_id,loginUserId)).build();
    }

    @DeleteMapping("/algorithm/{algorithm_id}/recommend")
    public ResponseEntity<?> deleteAlgorithmRecommend(@PathVariable(value = "algorithm_id") Long algorithm_id,
                                                             HttpServletRequest request) {
//        Long loginUserId = (Long) request.getAttribute("로그인 키키키키키");
        Long loginUserId = 1L;
        if(loginUserId == null)
            throw new CustomException(ErrorCode.INVALID_COOKIE);

        return ResponseEntity.status(algorithmService.deleteAlgorithmRecommend(algorithm_id,loginUserId)).build();
    }

}
