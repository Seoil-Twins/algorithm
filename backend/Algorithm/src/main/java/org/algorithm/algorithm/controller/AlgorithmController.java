package org.algorithm.algorithm.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.entity.ExplanationEntity;
import org.algorithm.algorithm.service.AlgorithmService;
import org.algorithm.algorithm.util.Const;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@ResponseBody
@RequiredArgsConstructor
public class AlgorithmController {

    private final AlgorithmService algorithmService;
    @GetMapping("/algorithm")
    public ResponseEntity<Object> getAllAlgorithm(@RequestParam(required = false, defaultValue = "0", value = "pageNo") int pageNo,
                                                       @RequestParam(required = false, defaultValue = "5", value = "pageSize") int pageSize,
                                                       HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            System.out.println(loginUser);
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getAll(pageNo, pageSize,loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");

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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");

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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");

        }
    }

    @GetMapping("/algorithm/tried/{user_id}")
    public ResponseEntity<Object> getTriedAlgorithm(@PathVariable("user_id")long userId, HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            System.out.println(loginUser);
            return ResponseEntity.status(HttpStatus.OK).body(algorithmService.getTriedAlgorithm(userId, loginUser));
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");

        }
    }

    @GetMapping("/algorithm/explanation/{algorithm_id}")
    public ObjectNode getExplanation(@PathVariable("algorithm_id")long algorithmId, HttpServletRequest request) {
        ExplanationEntity result = algorithmService.getExplanation(algorithmId);

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode resultNode = objectMapper.createObjectNode();
        resultNode.put("conetent", result.getContent());
        return resultNode;
    }
}
