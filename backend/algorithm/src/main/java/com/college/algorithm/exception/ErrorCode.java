package com.college.algorithm.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    NOT_MATCH_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호가 틀립니다.", 40010),

    /* 401 UNAUTHORIZED : 잘못된 권한 */
    INVALID_COOKIE(HttpStatus.UNAUTHORIZED, "유효하지 않은 쿠키입니다.", 40110),

    /* 403 FORBIDDEN : 잘못된 접근 */
    NOT_VERIFIED_EMAIL(HttpStatus.FORBIDDEN, "인증이 되어 있지 않은 이메일입니다.", 40310),

    /* 404 NOT FOUND : 리소스 없음 */
    NOT_FOUND_USER(HttpStatus.NOT_FOUND, "사용자가 존재하지 않습니다.", 40410),

    /* 409 CONFLICT : 리소스 충돌 */
    DUPLICATE_PARAMETER_NICKNAME(HttpStatus.CONFLICT, "닉네임이 이미 존재합니다", 40910),
    DUPLICATE_PARAMETER_EMAIL(HttpStatus.CONFLICT, "이메일이 이미 존재합니다", 40920),

    ;

    private final HttpStatus httpStatus;
    private final String message;
    private final int errorCode;
}
