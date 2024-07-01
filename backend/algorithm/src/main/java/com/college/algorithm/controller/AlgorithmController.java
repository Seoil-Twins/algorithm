package com.college.algorithm.controller;

import com.college.algorithm.dto.AlgorithmSearchRequestDto;
import com.college.algorithm.exception.BadRequestException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.service.AlgorithmService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@RestController
@ResponseBody
@RequiredArgsConstructor
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
        Set<String> validLevel = new HashSet<>(Arrays.asList("-1","0","1","2","3","4","5"));
        if (!validLevel.contains(level)) {
//            return ResponseEntity.badRequest().body(
////                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : level ( Level range -1 ~ 5 : default 0 )")
//            );
            throw new BadRequestException(ErrorCode.BAD_REQUEST);
        }

        Set<String> validSort = new HashSet<>(Arrays.asList("r","or","t","R","OR","T"));
        if (!validSort.contains(sort)) {
//            return ResponseEntity.badRequest().body(
//                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : sort ( sort only 'r', 'or', 't' : default 'r' )")
//            );
            throw new BadRequestException(ErrorCode.BAD_REQUEST);
        }

        Set<String> validSolved = new HashSet<>(Arrays.asList("a","s","ns","A","S","NS"));
        if (!validSolved.contains(solved)) {
//            return ResponseEntity.badRequest().body(
//                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : solved ( solved only 'a', 's', 'ns' : default 'a' )")
//            );

            throw new BadRequestException(ErrorCode.BAD_REQUEST);
        }

        Set<String> validRate = new HashSet<>(Arrays.asList("h","l","H","L"));
        if (!validRate.contains(rate) && rate != null) {
//            return ResponseEntity.badRequest().body(
//                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : rate ( rate only 'h', 'l' )")
//            );

            throw new BadRequestException(ErrorCode.BAD_REQUEST);
        } else if (rate != null){
            rate = rate.toLowerCase();
        }

        Set<String> validTag = new HashSet<>(Arrays.asList("1001","1002","1003","1004","1005","1006","1007","1008","1009","1010","1011","1012","1013","1014"));
        if (!validTag.contains(tag) && tag != null) {
//            return ResponseEntity.badRequest().body(
//                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : tag ( tag range 1001 ~ 1014 )" + " input : ")
//            );

            throw new BadRequestException(ErrorCode.BAD_REQUEST);
        }


        HttpSession session = request.getSession(false); // default true
        AlgorithmSearchRequestDto algorithmRequestDTO = new AlgorithmSearchRequestDto(page,count,solved.toLowerCase(),sort.toLowerCase(),level,rate,tag,keyword);
        Long loginUser = null; // String이 아니라 UserDTO로 받아야하고, 밑에서 세션으로 가져와야만합니다.
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (Long)session.getAttribute("로그인 암호 키 무언가");
        }

        if (loginUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getAll(algorithmRequestDTO));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getAll(algorithmRequestDTO));

        }

    }
}
