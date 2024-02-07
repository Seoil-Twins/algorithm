package org.algorithm.algorithm.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.algorithm.algorithm.entity.CodeEntity;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CodeDTO {

    private Long codeId;
    private Long userId;
    private Long algorithmId;
    private String code;
    private Long type;
    private Boolean solved;
    private LocalDateTime createdTime;


    //lombok 어노테이션으로 getter,setter,생성자,toString 메서드 생략 가능

    public static CodeDTO toCodeDTO(CodeEntity codeEntity){
        CodeDTO codeDTO = new CodeDTO();
        codeDTO.setCodeId(codeEntity.getCodeId());
        codeDTO.setUserId(codeEntity.getUserId());
        codeDTO.setAlgorithmId(codeEntity.getAlgorithmId());
        codeDTO.setCode(codeEntity.getCode());
        codeDTO.setType(codeEntity.getType());
        codeDTO.setSolved(codeEntity.getSolved());
        codeDTO.setCreatedTime(codeEntity.getCreatedTime());

        return codeDTO;
    }

}
