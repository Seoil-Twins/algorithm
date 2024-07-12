package com.college.algorithm.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RankingDto {
    private ResponseRankingUserDto user;
    private int tried;
    private Long solved;
}

/*

			"user": {
				"userId": number,
				"profile": string,
				"nickname": strinng
			},
			"tried": number,
			"solved": number
 */