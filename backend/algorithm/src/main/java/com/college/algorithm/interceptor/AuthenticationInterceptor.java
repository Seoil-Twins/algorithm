package com.college.algorithm.interceptor;

import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;

public class AuthenticationInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        HttpSession session = request.getSession(false);
        if (session == null) { throw new CustomException(ErrorCode.BLANK_COOKIE); }
        if (session.getAttribute("userId") == null) { throw new CustomException(ErrorCode.INVALID_COOKIE); }

        return true;
    }
}
