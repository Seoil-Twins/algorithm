package com.college.algorithm.type;

import lombok.Getter;

@Getter
public enum BoardType {
    GENERAL_ALL("일반 전체","p"),
    GENERAL_QUESTION("일반 질문","pq"),
    GENERAL_FREE("일반 자유","pf"),
    ALGORITHM_ALL("알고리즘 전체","a"),
    ALGORITHM_QUESTION("알고리즘 질문","aq"),
    ALGORITHM_FEEDBACK("알고리즘 피드백","af"),
    ;

    private final String typeName;
    private final String searchParam;

    BoardType(String typeName, String searchParam) {
        this.typeName = typeName;this.searchParam = searchParam;
    }
}