package com.college.algorithm.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

import java.util.stream.Stream;

@Getter
public enum EnumLinkKind {
    GITHUB("1001"),
    GOOGLE("1002"),
    NAVER("1003"),
    KAKAO("1004"),
    ;

    private String kindId;

    EnumLinkKind(String kindId) {
        this.kindId = kindId;
    }

    @JsonCreator
    public static EnumLinkKind parsing(String value) {
        return Stream.of(EnumLinkKind.values())
                .filter(enumLinkKind -> enumLinkKind.kindId.equals(value))
                .findFirst()
                .orElse(null);
    }
}
