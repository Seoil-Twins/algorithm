package com.college.algorithm.type;

import lombok.Getter;

@Getter
public enum BoardType {
    GENERAL_QUESTION("일반 질문"),
    GENERAL_FREE("일반 자유"),
    ALGORITHM_QUESTION("알고리즘 질문"),
    ALGORITHM_FEEDBACK("알고리즘 피드백"),
    ;

    private final String typeName;

    BoardType(String typeName) {
        this.typeName = typeName;
    }
}