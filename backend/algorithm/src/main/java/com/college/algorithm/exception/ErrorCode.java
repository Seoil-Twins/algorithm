package com.college.algorithm.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    NOT_MATCH_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호가 틀립니다.", 40010),
    EXPIRED_TIME_EMAIL(HttpStatus.BAD_REQUEST, "인증 시간이 만료된 이메일입니다.", 40030),
    NOT_MATCH_VERIFY_CODE(HttpStatus.BAD_REQUEST, "인증 번호가 일치하지 않습니다.", 40040),
    BROKEN_IMAGE(HttpStatus.BAD_REQUEST, "이미지 파일이 깨져있거나 존재하지 않습니다.", 40050),

    /* 401 UNAUTHORIZED : 잘못된 권한 */
    INVALID_COOKIE(HttpStatus.UNAUTHORIZED, "유효하지 않은 쿠키입니다.", 40110),
    BLANK_COOKIE(HttpStatus.UNAUTHORIZED, "쿠키가 존재하지 않습니다.", 40120),

    /* 403 FORBIDDEN : 잘못된 접근 */
    NOT_VERIFIED_EMAIL(HttpStatus.FORBIDDEN, "인증이 되어 있지 않은 이메일입니다.", 40310),
    DELETED_USER(HttpStatus.FORBIDDEN, "삭제된 사용자입니다.", 40330),

    /* 404 NOT FOUND : 리소스 없음 */
    NOT_FOUND_USER(HttpStatus.NOT_FOUND, "사용자가 존재하지 않습니다.", 40410),
    NOT_FOUND_BOARD_TYPE(HttpStatus.NOT_FOUND, "게시판 유형이 존재하지 않습니다.", 40470),
    NOT_FOUND_EMAIL_VERIFIED(HttpStatus.NOT_FOUND, "인증을 요청한 이메일이 존재하지 않습니다.", 40480),

    /* 409 CONFLICT : 리소스 충돌 */
    DUPLICATE_PARAMETER_NICKNAME(HttpStatus.CONFLICT, "닉네임이 이미 존재합니다", 40910),
    DUPLICATE_PARAMETER_EMAIL(HttpStatus.CONFLICT, "이메일이 이미 존재합니다", 40920),

    /* 500 Internal Server Error : 예기치 못한 서버 에러 */
    ERROR_EMAIL_SENDER(HttpStatus.INTERNAL_SERVER_ERROR, "이메일 전송에 실패하였습니다.", 50020),
    ERROR_IMAGE_UPLOAD(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 저장에 실패하였습니다.", 50030),
    ;

    private final HttpStatus httpStatus;
    private final String message;
    private final int errorCode;
}
