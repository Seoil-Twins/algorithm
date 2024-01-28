package org.algorithm.algorithm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.EmailVerifyDTO;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.service.UserService;
import org.algorithm.algorithm.util.Const;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@RestController
@ResponseBody
@RequiredArgsConstructor
public class UserController {
    //    @RequestMapping(value="/postUser", method = RequestMethod.POST)

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;


    @GetMapping("/registrationForm")
    public String showForm(HttpServletRequest request, RedirectAttributes rttr) {
        HttpSession session = request.getSession(false); // default true
        return "/registration-form.html";
    }

    @GetMapping("/user/me")
    public ResponseEntity<String> getRUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            System.out.println(loginUser);
            return ResponseEntity.ok("Authenticated");
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }

    @GetMapping("/user/notification")
    public ResponseEntity<Object> getUserNotification(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = userService.userNotification(loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }

    @GetMapping("/user/link/{user_id}")
    public ResponseEntity<Object> getUserLink(@PathVariable("user_id") String userId) throws JsonProcessingException {
        UserDTO loginUser = null;
        System.out.println("ASdasdasdasdsa");
        ObjectNode result = userService.userLinks(userId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/user/mypage/solved")
    public ResponseEntity<Object> getUserMypageSolved(HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = userService.userMypageSolved(loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }

    @GetMapping("/user/mypage/question")
    public ResponseEntity<Object> getUserMypageQuestion(HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = userService.userMypageQuestion(loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }

    @GetMapping("/user/mypage/feedback")
    public ResponseEntity<Object> getUserMypageFeddback(HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = userService.userMypageFeedback(loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }


    @GetMapping("/user/mypage/free")
    public ResponseEntity<Object> getUserMypageFree(HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = userService.userMypageFree(loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }

    @GetMapping("/user/mypage/answer")
    public ResponseEntity<Object> getUserMypageAnswer(HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = userService.userMypageAnswer(loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }

    @GetMapping("/user/mypage/comment")
    public ResponseEntity<Object> getUserMypageComment(HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = userService.userMypageComment(loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }

    @GetMapping("/user/mypage/favorite")
    public ResponseEntity<Object> getUserMypageFavorite(HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = userService.userMypageFavorite(loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }


    @PostMapping("/user")
    public String processForm(@RequestBody UserDTO userDTO) {
        userDTO.setUserPw(passwordEncoder.encode(userDTO.getUserPw()));
        // 사용자 정보를 모델에 추가합니다.
        System.out.println("userDTO :: " + userDTO);
        userService.save(userDTO);
        return "/index.html";
    }

    @PostMapping("/login")
    public String loginPOST(@RequestBody UserDTO userDTO, HttpServletRequest request, RedirectAttributes rttr){
        HttpSession session = request.getSession(true); // default true

        UserDTO login = userService.userLogin(userDTO);

        String failMessage = "아이디 혹은 비밀번호가 잘못 되었습니다.";

        if (login == null) {
            rttr.addFlashAttribute("loginFail", failMessage);
//            return "redirect:/login";
            return "fail";
        }

        session.setAttribute(Const.LOGIN_USER_KEY, login);
        System.out.println(session.getAttribute(Const.LOGIN_USER_KEY));
        return "success";
    }
    @ResponseBody
    @PostMapping("/user/verify/send")
    public String MailSend(@RequestBody EmailVerifyDTO emailVerifyDTO) throws MessagingException {
        System.out.println(emailVerifyDTO);
        String number = userService.sendEmail(emailVerifyDTO);

        System.out.println(number);

        return null;
    }


    @GetMapping("/user/verify/compare")
    @ResponseBody
    public String CompareVerifyCode(@RequestBody EmailVerifyDTO emailVerifyDTO) throws MessagingException {
        System.out.println(emailVerifyDTO);
        String result = userService.compareCode(emailVerifyDTO);

        return result;
    }
}