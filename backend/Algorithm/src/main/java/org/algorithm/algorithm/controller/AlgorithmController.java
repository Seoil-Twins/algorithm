package org.algorithm.algorithm.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.AlgorithmRequestDTO;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.entity.AlgorithmKindEntity;
import org.algorithm.algorithm.entity.ExplanationEntity;
import org.algorithm.algorithm.service.AlgorithmService;
import org.algorithm.algorithm.util.Const;
import org.algorithm.algorithm.util.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@ResponseBody
@RequiredArgsConstructor
public class AlgorithmController {

    private final AlgorithmService algorithmService;
    @GetMapping("/algorithm")
    public ResponseEntity<?> getAllAlgorithm(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                             @RequestParam(required = false, defaultValue = "5", value = "count") int count,
                                             @RequestParam(required = false, defaultValue = "a", value = "solved") String solved, // a : 전체, s : 푼 문제, ns : 안푼 문제
                                             @RequestParam(required = false, defaultValue = "r", value = "sort") String sort, // r : 최신순, or : 오래된순, t : 시도순
                                             @RequestParam(required = false, defaultValue = "0", value = "level") String level, // -1은 전체, 0~5
                                             @RequestParam(required = false, defaultValue = "a", value = "kind") String kind, // a : 전체, c = cpp, p : python, j : java
                                             @RequestParam(required = false, value = "rate") String rate, // h : 정답률 높은 순, l = 정답률 낮은 순
                                             @RequestParam(required = false, value = "tag") String tag, // 1~14
                                             @RequestParam(required = false, value = "keyword") String keyword,
                                                HttpServletRequest request) {
        Set<String> validLevel = new HashSet<>(Arrays.asList("-1","0","1","2","3","4","5"));
        if (!validLevel.contains(level)) {
            return ResponseEntity.badRequest().body(
                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : level ( Level range -1 ~ 5 : default 0 )")
            );
        }

        Set<String> validSort = new HashSet<>(Arrays.asList("r","or","t"));
        if (!validSort.contains(sort)) {
            return ResponseEntity.badRequest().body(
                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : sort ( sort only 'r', 'or', 't' : default 'r' )")
            );
        }

        Set<String> validSolved = new HashSet<>(Arrays.asList("a","s","ns"));
        if (!validSolved.contains(solved)) {
            return ResponseEntity.badRequest().body(
                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : solved ( solved only 'a', 's', 'ns' : default 'a' )")
            );
        }

        Set<String> validKind = new HashSet<>(Arrays.asList("a","c","p","j"));
        if (!validKind.contains(kind)) {
            return ResponseEntity.badRequest().body(
                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : kind ( kind only 'a', 'c', 'p' ,'j' : default 'a' )")
            );
        }

        Set<String> validRate = new HashSet<>(Arrays.asList("h","l"));
        if (!validRate.contains(rate) && rate != null) {
            return ResponseEntity.badRequest().body(
                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : rate ( rate only 'h', 'l' )")
            );
        }

        Set<String> validTag = new HashSet<>(Arrays.asList("1001","1002","1003","1004","1005","1006","1007","1008","1009","1010","1011","1012","1013","1014"));
        if (!validTag.contains(tag) && tag != null) {
            return ResponseEntity.badRequest().body(
                    new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request : tag ( tag range 1001 ~ 1014 )" + " input : ")
            );
        }

        HttpSession session = request.getSession(false); // default true
        AlgorithmRequestDTO algorithmRequestDTO = new AlgorithmRequestDTO(page,count,solved,sort,level,kind,rate,tag,keyword);
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getAll(algorithmRequestDTO, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getAll(algorithmRequestDTO));

        }
    }

    @GetMapping("/algorithm/recommend")
    public ResponseEntity<Object> getRecommendAlgorithm(HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            System.out.println(loginUser);
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getRecommend(loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getRecommend());

        }
    }

    @GetMapping("/algorithm/{algorithm_id}")
    public ResponseEntity<Object> getOneAlgorithm(@PathVariable("algorithm_id")long algorithm_id, HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            System.out.println(loginUser);
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getOneAlgorithm(algorithm_id, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getOneAlgorithm(algorithm_id));

        }
    }

    @GetMapping("/algorithm/tried/{user_id}")
    public ResponseEntity<Object> getTriedAlgorithm(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                                    @RequestParam(required = false, defaultValue = "5", value = "count") int count,
                                                    @PathVariable("user_id")long userId,
                                                    HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getTriedAlgorithm(page, count, userId, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getTriedAlgorithm(page, count, userId));

        }
    }

    @GetMapping("/algorithm/explanation/{algorithm_id}")
    public ObjectNode getExplanation(@PathVariable("algorithm_id")long algorithmId) {
        ExplanationEntity result = algorithmService.getExplanation(algorithmId);

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode resultNode = objectMapper.createObjectNode();
        resultNode.put("content", result.getContent());
        return resultNode;
    }

    @GetMapping("/algorithm/kind")
    public ResponseEntity<?> getKinds() {
        List<AlgorithmKindEntity> result = algorithmService.getKinds();

        return ResponseEntity.ok(result);
    }

}
