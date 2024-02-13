package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.algorithm.algorithm.dto.CodeDTO;
import org.algorithm.algorithm.dto.CommentCodeDTO;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "comment_code")
public class CommentCodeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_code_id", columnDefinition = "INT UNSIGNED")
    private Long commentCodeId;
    @Column(name = "code_id", columnDefinition = "INT UNSIGNED")
    private Long codeId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private Long userId;
    @Column(name = "content")
    private String content;
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    public static CommentCodeEntity toCommentCodeEntity(CommentCodeDTO commentCodeDTO){
        CommentCodeEntity commentCodeEntity = new CommentCodeEntity();
        commentCodeEntity.setCommentCodeId(commentCodeDTO.getCommentCodeId());
        commentCodeEntity.setCodeId(commentCodeDTO.getCodeId());
        commentCodeEntity.setUserId(commentCodeDTO.getUserId());
        commentCodeEntity.setContent(commentCodeDTO.getContent());
        commentCodeEntity.setCreatedTime(commentCodeDTO.getCreatedTime());

        return commentCodeEntity;
    }

    // lombok으로 인해서 Getter 및 Setter 메서드 생략
}
