package org.algorithm.algorithm.controller;

import org.algorithm.algorithm.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    @GetMapping("/registrationForm")
    public String showForm() {
        return "../../resources/templates/registration-form";
    }

    @PostMapping("/postUser")
    public String processForm(User user, Model model) {
        // 사용자 정보를 모델에 추가합니다.
        model.addAttribute("user", user);
        System.out.println(user);
        // 서비스 호출 ( 서비스에서 데이터 가공 )
        // 서비스에서 response를 받음 status code
        return "/templates/registration-confirmation";
    }
}