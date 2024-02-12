package org.algorithm.algorithm.controller;

import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.CodeDTO;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.service.CodeService;
import org.algorithm.algorithm.util.Const;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@ResponseBody
@RequiredArgsConstructor
public class CodeController {

    private final CodeService codeService;

    @GetMapping("/code")
    public ResponseEntity<?> getAllCode(@RequestParam(required = false, defaultValue = "0", value = "pageNo") int pageNo,
                                 @RequestParam(required = false, defaultValue = "5", value = "pageSize") int pageSize,
                                 HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = codeService.getAllCode(pageNo, pageSize);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }

    }

    @GetMapping("/code/detail/{code_id}")
    public ResponseEntity<?> getAllCode(@PathVariable(value = "code_id") Long codeId,
                                     HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = codeService.getSpecificCode(codeId);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @GetMapping("/code/{algorithm_id}")
    public ResponseEntity<?> getCodeByAlgorithmId(@PathVariable(value = "algorithm_id") Long algorithmId,
                                               @RequestParam(required = false, defaultValue = "0", value = "pageNo") int pageNo,
                                               @RequestParam(required = false, defaultValue = "5", value = "pageSize") int pageSize,
                                     HttpServletRequest request) {

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = codeService.getCodeByAlgorithmId(pageNo, pageSize, algorithmId);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PostMapping("/code")
    public ResponseEntity<?> postCode(@RequestBody CodeDTO codeDTO,
                                               HttpServletRequest request) {
        // algorithmId, code, type

        if(codeDTO.getCode() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Require Code !");
        if(codeDTO.getType() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Require Type !");
        if(codeDTO.getAlgorithmId() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Require AlgorithmId !");

        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            String result = codeService.postCode(codeDTO, loginUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }

}
