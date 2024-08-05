package com.college.algorithm.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AlgorithmSearchRequestDto {
    private int page;
    private int count;
    private String solved; // a : 전체, s : 푼 문제, ns : 안푼 문제
    private String sort; // r : 최신순, or : 오래된순, t : 시도순
    private String level; // -1은 전체, 0~5
    private String rate; // h : 정답률 높은 순, l = 정답률 낮은 순
    private String tag; // 1~14
    private String keyword;

    public AlgorithmSearchRequestDto(int page,int count, String solved, String sort, String level, String rate, String tag, String keyword){
        this.page = page;
        this.count = count;
        this.solved = solved;
        this.sort = sort;
        this.level = level;
        this.rate = rate;
        this.tag = tag;
        this.keyword = keyword;
    }

}