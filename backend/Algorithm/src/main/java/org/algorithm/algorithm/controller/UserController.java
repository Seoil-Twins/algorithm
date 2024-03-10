package org.algorithm.algorithm.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.EmailVerifyDTO;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.entity.UserEntity;
import org.algorithm.algorithm.entity.UserLinkEntity;
import org.algorithm.algorithm.exception.GlobalException;
import org.algorithm.algorithm.exception.UpdateException;
import org.algorithm.algorithm.service.UserService;
import org.algorithm.algorithm.util.Const;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.concurrent.TimeUnit;


@RestController
@ResponseBody
@RequiredArgsConstructor
public class UserController {
    //    @RequestMapping(value="/postUser", method = RequestMethod.POST)

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final StringRedisTemplate redisTemplate;


    @GetMapping("/registrationForm")
    public String showForm(HttpServletRequest request, RedirectAttributes rttr) {
        HttpSession session = request.getSession(false); // default true
        return "/registration-form.html";
    }

    @GetMapping("/user/me")
    public ResponseEntity<?> getRUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // default true

        UserDTO loginUser = null;
        if(session != null){
            // 상수로 뺼 예정
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {
            ObjectNode result = userService.userSelf(loginUser);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @GetMapping("/user/notification")
    public ResponseEntity<?> getUserNotification(HttpServletRequest request) {
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @GetMapping("/user/link/{user_id}")
    public ResponseEntity<?> getUserLink(@PathVariable("user_id") String userId,HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null) {
            ObjectNode result = userService.userLinks(userId);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @GetMapping("/user/mypage/solved")
    public ResponseEntity<?> getUserMypageSolved(HttpServletRequest request) throws JsonProcessingException {
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @GetMapping("/user/mypage/question")
    public ResponseEntity<?> getUserMypageQuestion(HttpServletRequest request) throws JsonProcessingException {
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @GetMapping("/user/mypage/feedback")
    public ResponseEntity<?> getUserMypageFeddback(HttpServletRequest request) throws JsonProcessingException {
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PostMapping("/user/verify/compare")
    @ResponseBody
    public ResponseEntity<?> CompareVerifyCode(@RequestBody EmailVerifyDTO emailVerifyDTO) throws MessagingException {
        /*
            private String email;
            private String verifyCode;
        */
        if(emailVerifyDTO.getEmail() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Require Email ! ");
        if(emailVerifyDTO.getVerifyCode() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Require Verify Code ! ");

        return userService.compareCode(emailVerifyDTO);
    }


    @PostMapping("/user")
    public ResponseEntity<String> processForm(@RequestBody UserDTO userDTO) {
        if(userDTO.getEmail() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Require Email ! ");
        if(userDTO.getUserPw() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Require Password ! ");
        if(userDTO.getNickname() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Require NickName ! ");

        userDTO.setUserPw(passwordEncoder.encode(userDTO.getUserPw()));

        // 사용자 정보를 모델에 추가합니다.
        userService.save(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(" Success User Post ! ");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginPOST(@RequestBody UserDTO userDTO, HttpServletRequest request, RedirectAttributes rttr){
        HttpSession session = request.getSession(true); // default true

        UserDTO login = userService.userLogin(userDTO);

        String failMessage = "아이디 혹은 비밀번호가 잘못 되었습니다.";

        if (login == null) {
            rttr.addFlashAttribute("loginFail", failMessage);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("아이디 혹은 비밀번호가 잘못 되었습니다.");
        }

        session.setAttribute(Const.LOGIN_USER_KEY, login);
        session.setMaxInactiveInterval(1800); // 세션 만료 시간 30분
        ResponseCookie responseCookie = ResponseCookie.from("JSESSIONID", session.getId()).httpOnly(true).path("/").maxAge(2592000).build();

        ObjectNode responseUser = userService.userSelf(login);
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        redisTemplate.opsForValue().set(responseCookie.toString(), String.valueOf(responseUser.get("userId")), 30, TimeUnit.MINUTES);
        String userId = responseUser.get("userId").toString(); // 또는 toString()
        redisTemplate.opsForValue().set(responseCookie.toString(), userId, 30, TimeUnit.MINUTES);
        System.out.println(responseUser);
        return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(responseUser);
    }


    @PostMapping("/logoutee")
    public ResponseEntity<?> logoutDelete(HttpServletRequest request, HttpServletResponse response) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
            return ResponseEntity.ok("logout");
        }
        return ResponseEntity.ok("logout failed");

    }
    @ResponseBody
    @PostMapping("/user/verify/send")
    public ResponseEntity<?> MailSend(@RequestBody EmailVerifyDTO emailVerifyDTO) throws MessagingException {

        if(emailVerifyDTO.getEmail() == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Require Email ! ");
        String number = userService.sendEmail(emailVerifyDTO);

        return ResponseEntity.status(HttpStatus.OK).body("Send Success");
    }

    @ResponseBody
    @PostMapping("/user/link/{user_id}")
    public ResponseEntity<?> postLink(@PathVariable("user_id") int userId, @RequestBody UserLinkEntity userLinkEntity, HttpServletRequest request) throws MessagingException {
        // link_kind, domain
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;

        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }
        if (loginUser != null && userId == loginUser.getUserId()) {
            ObjectNode result = userService.userLinkPost(userId, userLinkEntity);
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }

    @PatchMapping("/user/{user_id}")
    public ResponseEntity<Object> patchUser(@PathVariable("user_id") int userId,@RequestBody UserDTO userDTO, HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            if(loginUser.getUserId() != userId)
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Update Not Acceptable");

            ObjectNode result = null;
            try {
                result = userService.userUpdate(userDTO,userId);
            } catch (MessagingException e) {
                throw new UpdateException("Error User Update");
            }
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @PatchMapping("/user/nofi/{user_id}")
    public ResponseEntity<Object> patchUserNofi(@PathVariable("user_id") int userId,@RequestBody UserDTO userDTO, HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            if(loginUser.getUserId() != userId)
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Accept Failed. Only Own Data Accepted.");

            ObjectNode result = null;
            try {
                result = userService.userUpdate(userDTO,userId);
            } catch (MessagingException e) {
                throw new GlobalException("User Update Controller Error ! ");
            }
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }

    @DeleteMapping("/user/{user_id}")
    public ResponseEntity<Object> deleteUser(@PathVariable("user_id") int userId, HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(false); // default true
        UserDTO loginUser = null;
        if(session != null){
            loginUser = (UserDTO)session.getAttribute(Const.LOGIN_USER_KEY);
        }

        if (loginUser != null) {

            if(loginUser.getUserId() != userId)
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Accept Failed. Only Own Data Accepted.");

            String result = null;
            try {
                result = userService.userDelete(userId);
            } catch (MessagingException e) {
                throw new GlobalException("User Delete Controller Error ! ");
            }
            return ResponseEntity.ok(result);
        } else {
            // 세션에 loginUser가 없으면 로그인되지 않은 상태
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated. Please Using After Login");
        }
    }


}