package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotificationDto {
    @Getter
    @AllArgsConstructor
    public static class User {
        private final Long userId;
        private final String profile;
        private final String nickname;
    }

    @Getter
    @AllArgsConstructor
    public static class Notice {
        private final Long noticeId;
        private final String title;
    }

    @Getter
    @AllArgsConstructor
    public static class Board {
        private final Long boardId;
        private final Character boardTypeId;
        private final String title;
    }

    @Getter
    @AllArgsConstructor
    public static class Comment {
        private final Long commentId;
        private final String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Algorithm {
        private final Long algorithmId;
    }

    private final String notificationType;
    private final User fromUser;
    private final Notice notice;
    private final Board board;
    private final Comment comment;
    private final Algorithm algorithm;
    private final String createdTime;
}
