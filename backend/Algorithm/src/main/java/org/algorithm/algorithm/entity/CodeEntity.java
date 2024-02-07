package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.algorithm.algorithm.dto.CodeDTO;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "code")
public class CodeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code_id")
    private Long codeId;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "algorithm_id")
    private Long algorithmId;
    @Column(name = "code")
    private String code;
    @Column(name = "type")
    private Long type;
    @Column(name = "solved")
    private Boolean solved;
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    public static CodeEntity toCodeEntity(CodeDTO codeDTO){
        CodeEntity codeEntity = new CodeEntity();
        codeEntity.setCodeId(codeDTO.getCodeId());
        codeEntity.setUserId(codeDTO.getUserId());
        codeEntity.setAlgorithmId(codeDTO.getAlgorithmId());
        codeEntity.setCode(codeDTO.getCode());
        codeEntity.setType(codeDTO.getType());
        codeEntity.setSolved(codeDTO.getSolved());
        codeEntity.setCreatedTime(codeDTO.getCreatedTime());

        return codeEntity;
    }

    // lombok으로 인해서 Getter 및 Setter 메서드 생략
}
