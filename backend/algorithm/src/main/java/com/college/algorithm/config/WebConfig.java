package com.college.algorithm.config;

import com.college.algorithm.interceptor.AuthenticationInterceptor;
import com.college.algorithm.interceptor.PathMatcherInterceptor;
import com.college.algorithm.interceptor.SessionInterceptor;
import com.college.algorithm.util.PathMethod;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authenticationInterceptor())
                .order(1)
                .addPathPatterns("/**");
        
        registry.addInterceptor(sessionInterceptor())
                .order(2)
                .addPathPatterns("/**")
                .excludePathPatterns("/user/login");
    }

    // Proxy 패턴을 사용하여 Path 및 Method를 체크하는 역할의 대리자(PathMatcher)를 생성
    private HandlerInterceptor authenticationInterceptor() {
        final PathMatcherInterceptor interceptor =
                new PathMatcherInterceptor(new AuthenticationInterceptor());

        return interceptor
                /*
                * includePathPattern -> 사용자만 사용할 수 있는 API 추가 (인증이 필요한 API면 필수)
                * default -> 추가하지 않은 API는 누구나 사용 가능
                * */
                .includePathPattern("/user", PathMethod.GET)
                .includePathPattern("/user/link", PathMethod.POST);
    }

    // Proxy 패턴을 사용하여 Path 및 Method를 체크하는 역할의 대리자(PathMatcher)를 생성
    private HandlerInterceptor sessionInterceptor() {
        final PathMatcherInterceptor interceptor =
                new PathMatcherInterceptor(new SessionInterceptor());

        return interceptor
                /*
                * includePathPattern -> 요청 하면 Session 유효 시간 갱신되는 API 추가
                * excludePathPattern -> 요청을 해도 Session 유효 시간이 갱신 안 되는 API 추가 (로그인, 회원가입 등)
                * default -> 추가하지 않은 API는 세션이 있다면 유효 시간 증가
                * */
                .includePathPattern("/**", PathMethod.GET)
                .includePathPattern("/**", PathMethod.POST)
                .includePathPattern("/**", PathMethod.PATCH)
                .includePathPattern("/**", PathMethod.PUT)
                .includePathPattern("/**", PathMethod.DELETE)
                .excludePathPattern("/user", PathMethod.POST)
                .excludePathPattern("/user/login", PathMethod.POST)
                .excludePathPattern("/user/verify/*", PathMethod.POST);
    }
}
