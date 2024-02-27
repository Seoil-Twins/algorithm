package org.algorithm.algorithm.dto;

import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.algorithm.algorithm.entity.CommentEntity;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CodeResponseDTO {

    private Boolean solved;
    private double excuteTime;
    private ObjectNode results;

    public CodeResponseDTO(Boolean solved, double excuteTime, ObjectNode results){
        this.excuteTime = excuteTime;
        this.solved = solved;
        this.results = results;
    }


}
