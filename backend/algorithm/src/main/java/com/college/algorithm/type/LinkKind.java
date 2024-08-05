package com.college.algorithm.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

import java.util.stream.Stream;

@Getter
public enum LinkKind {
    GITHUB("1001"),
    GOOGLE("1002"),
    NAVER("1003"),
    KAKAO("1004"),
    ;

    private String kindId;

    LinkKind(String kindId) {
        this.kindId = kindId;
    }

    @JsonCreator
    public static LinkKind parsing(String value) {
        return Stream.of(LinkKind.values())
                .filter(linkKind -> linkKind.kindId.equals(value))
                .findFirst()
                .orElse(null);
    }
}
