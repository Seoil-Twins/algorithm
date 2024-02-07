package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.algorithm.algorithm.dto.AlgorithmDTO;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "algorithm")
public class AlgorithmEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "algorithm_id", columnDefinition = "INT UNSIGNED")
    private long algorithmId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private long userId;
    @Column(name = "title")
    private String title;
    @Column(name = "level")
    private String level;
    @Column(name = "algorithm_kind", columnDefinition = "INT UNSIGNED")
    private Long algorithmKind;
    @Column(name = "algorithm_compe", nullable = true, columnDefinition = "INT UNSIGNED")
    private Long algorithmCompe;
    @Column(name = "content")
    private String content;
    @Column(name = "limit_time")
    private String limitTime;
    @Column(name = "limit_mem")
    private String limitMem;
    @Column(name = "created_time")
    private LocalDateTime createdTime;


    // 생성자, getter, setter 등 필요한 메서드를 추가할 수 있습니다.

    public static AlgorithmEntity toAlgorithmEntity(AlgorithmDTO algorithmDTO) {
        AlgorithmEntity algorithmEntity = new AlgorithmEntity();
        algorithmEntity.setAlgorithmId(algorithmDTO.getAlgorithmId());
        algorithmEntity.setUserId(algorithmDTO.getUserId());
        algorithmEntity.setTitle(algorithmDTO.getTitle());
        algorithmEntity.setLevel(algorithmDTO.getLevel());
        algorithmEntity.setAlgorithmKind(algorithmDTO.getAlgorithmKind());
        algorithmEntity.setAlgorithmCompe(algorithmDTO.getAlgorithmCompe());
        algorithmEntity.setContent(algorithmDTO.getContent());
        algorithmEntity.setLimitTime(algorithmDTO.getLimitTime());
        algorithmEntity.setLimitMem(algorithmDTO.getLimitMem());
        algorithmEntity.setCreatedTime(algorithmDTO.getCreatedTime());
        return algorithmEntity;
    }

    // Getter 및 Setter 메서드 생략
}