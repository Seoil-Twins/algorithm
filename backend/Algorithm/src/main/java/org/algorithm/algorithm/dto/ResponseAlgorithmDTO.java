package org.algorithm.algorithm.dto;


import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ResponseAlgorithmDTO {
    private long algorithmId;
    private ObjectNode user;
    private String title;
    private String level;
    private String kinds;
    private Long algorithmCompe;
    private String content;
    private String limitTime;
    private String limitMem;
    private ObjectNode testcase;
    private Boolean favorite;
    private LocalDateTime createdTime;

}
