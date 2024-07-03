package com.college.algorithm.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    BAD_REQUEST_SEARCH(HttpStatus.BAD_REQUEST,"검색 인자 값이 잘못 되었습니다.",40010),

    /* 401 UNAUTHORIZED : 잘못된 권한 */
    INVALID_COOKIE(HttpStatus.UNAUTHORIZED, "유효하지 않은 쿠키입니다.", 40110),
    EXPIRED_COOKIE(HttpStatus.UNAUTHORIZED, "만료된 쿠키입니다.", 40120),

    /* 403 FORBIDDEN : 잘못된 접근 */
    NOT_VERIFIED_EMAIL(HttpStatus.FORBIDDEN, "인증이 되어 있지 않은 이메일입니다.", 40310),
    NOT_MATCHED_USER(HttpStatus.FORBIDDEN, "본인이 아닌 사용자의 접근입니다.", 40320),

    /* 404 NOT FOUND : 리소스 없음 */
    NOT_FOUND_USER(HttpStatus.NOT_FOUND, "사용자가 존재하지 않습니다.", 40410),
    NOT_FOUND_ALGORITHM(HttpStatus.NOT_FOUND, "알고리즘이 존재하지 않습니다.", 40420),
    NOT_FOUND_EXPLANATION(HttpStatus.NOT_FOUND, "풀이가 존재하지 않습니다.", 40430),
    NOT_FOUND_SUGGEST(HttpStatus.NOT_FOUND, "추천 알고리즘이 존재하지 않습니다.", 40440),
    NOT_FOUND_CORRECT(HttpStatus.NOT_FOUND, "해당 정답 코드는 존재하지 않습니다.", 40450),
    NOT_FOUND_CORRECT_RECOMMEND(HttpStatus.NOT_FOUND, "해당 정답 코드의 추천이 존재하지 않습니다.", 40460),


    /* 409 CONFLICT : 리소스 충돌 */
    DUPLICATE_PARAMETER_NICKNAME(HttpStatus.CONFLICT, "닉네임이 이미 존재합니다", 40910),
    DUPLICATE_PARAMETER_EMAIL(HttpStatus.CONFLICT, "이메일이 이미 존재합니다", 40920),
    DUPLICATE_CORRECT_RECOMMEND(HttpStatus.CONFLICT, "정답 코드에 대한 추천이 이미 존재합니다", 40930),


    /* 500 SERVER : 서버측 에러 */
    SQL_EXCEPTION(HttpStatus.CONFLICT, "SQL 실행 중 오류가 발생했습니다.", 50010),
    ;

    private final HttpStatus httpStatus;
    private final String message;
    private final int errorCode;
}
