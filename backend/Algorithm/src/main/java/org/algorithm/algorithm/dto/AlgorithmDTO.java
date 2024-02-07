package org.algorithm.algorithm.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.algorithm.algorithm.entity.AlgorithmEntity;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AlgorithmDTO {
    private long algorithmId;
    private long userId;
    private String title;
    private String level;
    private Long algorithmKind;
    private Long algorithmCompe;
    private String content;
    private String limitTime;
    private String limitMem;
    private LocalDateTime createdTime;

    public static AlgorithmDTO toAlgorithmDTO(AlgorithmEntity algorithmEntity) {
        AlgorithmDTO algorithmDTO = new AlgorithmDTO();
        algorithmDTO.setAlgorithmId(algorithmEntity.getAlgorithmId());
        algorithmDTO.setUserId(algorithmEntity.getUserId());
        algorithmDTO.setTitle(algorithmEntity.getTitle());
        algorithmDTO.setLevel(algorithmEntity.getLevel());
        algorithmDTO.setAlgorithmKind(algorithmEntity.getAlgorithmKind());
        algorithmDTO.setAlgorithmCompe(algorithmEntity.getAlgorithmCompe());
        algorithmDTO.setContent(algorithmEntity.getContent());
        algorithmDTO.setLimitTime(algorithmEntity.getLimitTime());
        algorithmDTO.setLimitMem(algorithmEntity.getLimitMem());
        algorithmDTO.setCreatedTime(algorithmEntity.getCreatedTime());
        return algorithmDTO;
    }
}
