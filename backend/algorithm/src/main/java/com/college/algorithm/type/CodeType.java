package com.college.algorithm.type;

import lombok.Getter;

@Getter
public enum CodeType {
    CPP("3001"),
    PYTHON("3002"),
    JAVA("3003"),
    ;

    private final String type;

    CodeType(String type) {
        this.type = type;
    }
}