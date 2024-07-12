package com.college.algorithm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ResponseUserLinkDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class LinkDto {
        private final String linkKind;
        private final String domain;
        private final String createdTime;
    }

    private final List<LinkDto> links;
}
