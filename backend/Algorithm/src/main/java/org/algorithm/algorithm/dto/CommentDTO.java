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
import org.algorithm.algorithm.entity.CommentEntity;

import javax.xml.stream.events.Comment;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CommentDTO {

    private long commentId;
    private long boardId;
    private long userId;
    private String content;
    private LocalDateTime createdTime;

    //lombok 어노테이션으로 getter,setter,생성자,toString 메서드 생략 가능

    public static CommentDTO toCommentDTO(CommentEntity commentEntity){
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setCommentId(commentEntity.getCommentId());
        commentDTO.setUserId(commentEntity.getUserId());
        commentDTO.setBoardId(commentEntity.getBoardId());
        commentDTO.setContent(commentEntity.getContent());
        commentDTO.setCreatedTime(commentEntity.getCreatedTime());

        return commentDTO;
    }

}
