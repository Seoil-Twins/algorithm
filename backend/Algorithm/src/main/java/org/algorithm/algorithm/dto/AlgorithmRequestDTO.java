package org.algorithm.algorithm.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.algorithm.algorithm.entity.EmailVerifyEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AlgorithmRequestDTO {
    private int page;
    private int count;
    private String solved; // a : 전체, s : 푼 문제, ns : 안푼 문제
    private String sort; // r : 최신순, or : 오래된순, t : 시도순
    private String level; // -1은 전체, 0~5
    private String kind; // a : 전체, c = cpp, p : python, j : java
    private String rate; // h : 정답률 높은 순, l = 정답률 낮은 순
    private String tag; // 1~14
    private String keyword;

    public AlgorithmRequestDTO(int page,int count, String solved, String sort, String level, String kind, String rate, String tag, String keyword){
        this.page = page;
        this.count = count;
        this.solved = solved;
        this.sort = sort;
        this.level = level;
        this.kind = kind;
        this.rate = rate;
        this.tag = tag;
        this.keyword = keyword;
    }
    //lombok 어노테이션으로 getter,setter,생성자,toString 메서드 생략 가능

}