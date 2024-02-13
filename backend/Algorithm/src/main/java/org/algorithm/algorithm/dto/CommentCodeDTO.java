package org.algorithm.algorithm.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.algorithm.algorithm.entity.CodeEntity;
import org.algorithm.algorithm.entity.CommentCodeEntity;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CommentCodeDTO {

    private Long commentCodeId;
    private Long codeId;
    private Long userId;
    private String content;
    private LocalDateTime createdTime;

    public static CommentCodeDTO commentCodeDTO(CommentCodeEntity commentCodeEntity){
        CommentCodeDTO commentCodeDTO = new CommentCodeDTO();
        commentCodeDTO.setCommentCodeId(commentCodeEntity.getCommentCodeId());
        commentCodeDTO.setCodeId(commentCodeEntity.getCodeId());
        commentCodeDTO.setUserId(commentCodeEntity.getUserId());
        commentCodeDTO.setContent(commentCodeEntity.getContent());
        commentCodeDTO.setCreatedTime(commentCodeEntity.getCreatedTime());

        return commentCodeDTO;
    }

    // lombok으로 인해서 Getter 및 Setter 메서드 생략
}
