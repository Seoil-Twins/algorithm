package com.college.algorithm.dto;

import com.college.algorithm.entity.AlgorithmTestcase;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AlgorithmDetailDto {
    private Long algorithmId;
    private String title;
    private String kind;
    private String content;
    private String limitTime;
    private String limitMemory;
    private String thumbnail;
    private Boolean isRecommend;
    private List<AlgorithmDetailTestcaseDto> testcases;
}
/*
* {
	"algorithmId": number,
	"title": string,
	"kind": string,
	"content": string,
	"limitTime": string,
	"limitMemory": string,
	// 북마크 여부는 Session이 없으면 null로 반환됩니다.
	"isRecommend": boolean | null,
	"testcase": [
		{
			"input": string,
			"output": string
		}
	]
}
* */