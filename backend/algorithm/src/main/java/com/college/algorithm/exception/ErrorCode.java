package com.college.algorithm.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    BAD_REQUEST_SEARCH(HttpStatus.BAD_REQUEST,"검색 인자 값이 잘못 되었습니다.",40010),
    BAD_REQUEST_BOARD_TYPE(HttpStatus.BAD_REQUEST,"같은 카테고리에서만 변경이 가능합니다.",40060),
    BROKEN_IMAGE(HttpStatus.BAD_REQUEST, "이미지 파일이 깨져있거나 존재하지 않습니다.", 40050),

    /* 401 UNAUTHORIZED : 잘못된 권한 */
    INVALID_COOKIE(HttpStatus.UNAUTHORIZED, "유효하지 않은 쿠키입니다.", 40110),
    EXPIRED_COOKIE(HttpStatus.UNAUTHORIZED, "만료된 쿠키입니다.", 40120),

    /* 403 FORBIDDEN : 잘못된 접근 */
    NOT_VERIFIED_EMAIL(HttpStatus.FORBIDDEN, "인증이 되어 있지 않은 이메일입니다.", 40310),
    NOT_MATCHED_USER(HttpStatus.FORBIDDEN, "본인이 아닌 사용자의 접근입니다.", 40320),
    DELETED_BOARD(HttpStatus.FORBIDDEN, "이미 삭제된 게시글입니다.", 40340),
    NOT_MATCHED_BOARD(HttpStatus.FORBIDDEN, "해당 게시글의 댓글이 아닙니다", 40350),

    /* 404 NOT FOUND : 리소스 없음 */
    NOT_FOUND_USER(HttpStatus.NOT_FOUND, "사용자가 존재하지 않습니다.", 40410),
    NOT_FOUND_ALGORITHM(HttpStatus.NOT_FOUND, "알고리즘이 존재하지 않습니다.", 40420),
    NOT_FOUND_EXPLANATION(HttpStatus.NOT_FOUND, "풀이가 존재하지 않습니다.", 40430),
    NOT_FOUND_SUGGEST(HttpStatus.NOT_FOUND, "추천 아이템이 존재하지 않습니다.", 40440),
    NOT_FOUND_CORRECT(HttpStatus.NOT_FOUND, "해당 정답 코드는 존재하지 않습니다.", 40450),
    NOT_FOUND_RECOMMEND(HttpStatus.NOT_FOUND, "해당 추천이 존재하지 않습니다.", 40460),
    NOT_FOUND_BOARD(HttpStatus.NOT_FOUND, "게시글이 존재하지 않습니다.", 40490),
    NOT_FOUND_COMMENT(HttpStatus.NOT_FOUND, "댓글이 존재하지 않습니다.", 40491),
    NOT_FOUND_IMAGE(HttpStatus.NOT_FOUND, "더미 이미지가 존재하지 않습니다.", 40492),


    /* 409 CONFLICT : 리소스 충돌 */
    DUPLICATE_PARAMETER_NICKNAME(HttpStatus.CONFLICT, "닉네임이 이미 존재합니다", 40910),
    DUPLICATE_PARAMETER_EMAIL(HttpStatus.CONFLICT, "이메일이 이미 존재합니다", 40920),
    DUPLICATE_RECOMMEND(HttpStatus.CONFLICT, "추천이 이미 존재합니다", 40930),
    DUPLICATE_ADOPT(HttpStatus.CONFLICT, "추천이 이미 존재합니다", 40940),


    /* 500 SERVER : 서버측 에러 */
    SQL_EXCEPTION(HttpStatus.CONFLICT, "SQL 실행 중 오류가 발생했습니다.", 50010),
    ERROR_IMAGE_UPLOAD(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 저장에 실패하였습니다.", 50030),
    ;

    private final HttpStatus httpStatus;
    private final String message;
    private final int errorCode;
}
