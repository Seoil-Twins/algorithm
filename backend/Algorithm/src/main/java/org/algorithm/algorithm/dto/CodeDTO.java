package org.algorithm.algorithm.dto;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
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

    public static ObjectNode toCodeDTOJSON(CodeEntity codeEntity){
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();

        response.put("codeId",codeEntity.getCodeId());
        response.put("userId",codeEntity.getUserId());
        response.put("algorithmId",codeEntity.getAlgorithmId());
        response.put("code",codeEntity.getCode());
        response.put("type",codeEntity.getType());
        response.put("solved",codeEntity.getSolved());
        response.put("createdTime", String.valueOf(codeEntity.getCreatedTime()));

        return response;
    }

}
