package com.college.algorithm.type;

import lombok.Getter;

@Getter
public enum AlgorithmTag {

    MATH("1001"),
    IMPLEMENTATION("1002"),
    DYNAMIC_PROGRAMMING("1003"),
    DATA_STRUCTURE("1004"),
    GRAPH("1005"),
    GREEDY("1006"),
    BRUTE_FORCE("1007"),
    SORTING("1008"),
    GEOMETRY("1009"),
    TREE("1010"),
    SEGMENT("1011"),
    BFS("1012"),
    DFS("1013"),
    MISC("1014");

    private final String tag;

    AlgorithmTag(String tag) {
        this.tag = tag;
    }
}