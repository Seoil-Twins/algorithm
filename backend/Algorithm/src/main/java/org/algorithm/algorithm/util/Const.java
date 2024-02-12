package org.algorithm.algorithm.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import java.util.Arrays;
import java.util.List;

public class Const {
    public static final String LOGIN_USER_KEY = "loginUser";
    public static final List<String> NOIFS = Arrays.asList("annoNofi", "postNofi", "commentNofi", "likeNofi", "answerNofi", "eventNofi");
    public static final List<String> SOLVED = Arrays.asList("tried","solved","favorite");
    public static final List<String> BOARD = Arrays.asList("board_id","board_type","user_id","title","content","solved","created_time","views");
    public static final List<String> MYPAGEANSWER = Arrays.asList("board_id","board_type","title","content","solved","views","created_time");;
    public static final List<String> MYPAGECOMMENT = Arrays.asList("board_id","board_type","title","content","views","created_time");
    public static final List<String> MYPAGEFAVORITE = Arrays.asList("board_id","board_type","title","content","commentCount","solved","views","created_time");
    public static final String EMAILSENDER = "ynkbusiness2024@gmail.com";


    public enum CustomErrorCode {
        NICKNAME_DUPLICATED(40910,  HttpStatus.Series.CLIENT_ERROR, "Nickname Duplicated"),
        EMAIL_DUPLICATED(40920,  HttpStatus.Series.CLIENT_ERROR, "EMail Duplicated"),
        // ... 추가적인 에러 코드
        ;

        private final int code;
        private final HttpStatus.Series series;
        private final String message;

        CustomErrorCode(int code, HttpStatus.Series series, String message) {
            this.code = code;
            this.series = series;
            this.message = message;
        }

        public int value() {
            return this.code;
        }

        // Getter 메소드
    }

}
