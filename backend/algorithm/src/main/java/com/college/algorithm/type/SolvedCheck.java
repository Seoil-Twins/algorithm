package com.college.algorithm.type;

import lombok.Getter;

@Getter
public enum SolvedCheck {
    ALL("a"),
    SOLVED("s"),
    NOT_SOLVED("ns");

    private final String solved;

    SolvedCheck(String solved) {
        this.solved = solved;
    }
}
