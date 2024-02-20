package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.algorithm.algorithm.dto.CommentDTO;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "comment")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", columnDefinition = "INT UNSIGNED")
    private Long commentId;
    @Column(name = "board_id", columnDefinition = "INT UNSIGNED")
    private Long boardId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private Long userId;
    @Column(name = "content")
    private String content;
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    public static CommentEntity toCommentEntity(CommentDTO commentDTO){
        CommentEntity commentEntity = new CommentEntity();
        commentEntity.setCommentId(commentDTO.getCommentId());
        commentEntity.setUserId(commentDTO.getUserId());
        commentEntity.setBoardId(commentDTO.getBoardId());
        commentEntity.setContent(commentDTO.getContent());
        commentEntity.setCreatedTime(commentDTO.getCreatedTime());

        return commentEntity;
    }

}