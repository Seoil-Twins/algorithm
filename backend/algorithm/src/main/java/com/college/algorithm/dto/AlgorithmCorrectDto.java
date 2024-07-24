package com.college.algorithm.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class AlgorithmCorrectDto implements Serializable {
    private Long correctId;
    private ResponseAlgorithmUserDto user;
    private String code;
    private Integer recommendCount;
}
