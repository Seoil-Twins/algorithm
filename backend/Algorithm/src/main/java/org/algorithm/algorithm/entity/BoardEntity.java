package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.algorithm.algorithm.dto.BoardDTO;
import org.algorithm.algorithm.dto.CodeDTO;
import org.algorithm.algorithm.dto.CommentCodeDTO;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "board")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id", columnDefinition = "INT UNSIGNED")
    private Long boardId;
    @Column(name = "board_type", columnDefinition = "INT UNSIGNED")
    private Long boardType;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private Long userId;
    @Column(name = "algorithm_id", columnDefinition = "INT UNSIGNED")
    private Long algorithmId;
    @Column(name = "title")
    private String title;
    @Column(name = "content")
    private String content;
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    public static BoardEntity toBoardEntity(BoardDTO boardDTO){
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setBoardId(boardDTO.getBoardId());
        boardEntity.setBoardType(boardDTO.getBoardType());
        boardEntity.setAlgorithmId(boardDTO.getAlgorithmId());
        boardEntity.setUserId(boardDTO.getUserId());
        boardEntity.setTitle(boardDTO.getTitle());
        boardEntity.setContent(boardDTO.getContent());
        boardEntity.setCreatedTime(boardDTO.getCreatedTime());

        return boardEntity;
    }

    // lombok으로 인해서 Getter 및 Setter 메서드 생략
}
