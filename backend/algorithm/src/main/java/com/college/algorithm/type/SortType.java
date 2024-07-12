package com.college.algorithm.type;

import lombok.Getter;

@Getter
public enum SortType {
    RECENT("r"),
    OLDEST("or"),
    TRIAL("t");

    private final String sort;

    SortType(String sort) {
        this.sort = sort;
    }
}
