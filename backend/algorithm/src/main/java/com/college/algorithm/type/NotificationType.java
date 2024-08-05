package com.college.algorithm.type;

import lombok.Getter;

@Getter
public enum NotificationType {
    NOTICE("1001"),
    EVENT("1002"),
    COMMENT("1003"),
    BOARD_FAVORITE("1004"),
    COMMENT_FAVORITE("1005"),
    ADOPT("1006"),
    ;

    private final String typeId;

    NotificationType(String typeId) {
        this.typeId = typeId;
    }
}
