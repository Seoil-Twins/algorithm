package com.college.algorithm.interceptor;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class SessionInterceptor implements HandlerInterceptor {
    private static final int EXTENDED_SESSION_TIME = 60 * 60 * 24 * 30; // 30 days
    private static final String cookieName = "JSESSIONID";

    @Override
    public boolean preHandle(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.setMaxInactiveInterval(EXTENDED_SESSION_TIME);
            Cookie[] cookies = request.getCookies();

            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if (cookieName.equals(cookie.getName())) {
                        cookie.setMaxAge(EXTENDED_SESSION_TIME);
                        cookie.setHttpOnly(true);
                        cookie.setSecure(true);
                        cookie.setPath("/");
                        response.addCookie(cookie);
                    }
                }
            }
        }

        return true;
    }
}
