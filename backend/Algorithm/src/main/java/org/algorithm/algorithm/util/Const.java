package org.algorithm.algorithm.util;

import java.util.Arrays;
import java.util.List;

public class Const {
    public static final String LOGIN_USER_KEY = "loginUser";
    public static final List<String> NOIFS = Arrays.asList("anno_nofi", "post_nofi", "comment_nofi", "like_nofi", "answer_nofi", "event_nofi");
    public static final List<String> SOLVED = Arrays.asList("tried","solved","favorite");
    public static final List<String> BOARD = Arrays.asList("board_id","board_type","user_id","title","content","solved","created_time","views");
    public static final List<String> MYPAGEANSWER = Arrays.asList("board_id","board_type","title","content","solved","views","created_time");;
    public static final List<String> MYPAGECOMMENT = Arrays.asList("board_id","board_type","title","content","views","created_time");
    public static final List<String> MYPAGEFAVORITE = Arrays.asList("board_id","board_type","title","content","commentCount","solved","views","created_time");
    public static final String EMAILSENDER = "ynkbusiness2024@gmail.com";
}
