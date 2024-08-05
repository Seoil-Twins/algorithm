package com.college.algorithm.type;

import lombok.Getter;

@Getter
public enum LevelRange {
    ALL_LEVEL("-1"),
    ZERO("0"),
    ONE("1"),
    TWO("2"),
    THREE("3"),
    FOUR("4"),
    FIVE("5");

    private final String level;

    LevelRange(String level) {
        this.level = level;
    }

}