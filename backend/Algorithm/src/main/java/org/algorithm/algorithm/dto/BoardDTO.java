package org.algorithm.algorithm.dto;


import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.algorithm.algorithm.entity.BoardEntity;
import org.algorithm.algorithm.entity.EmailVerifyEntity;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BoardDTO {

    private Long boardId;
    private Long boardType;
    private Long userId;
    private Long algorithmId;
    private String title;
    private String content;
    private LocalDateTime createdTime;

    //lombok 어노테이션으로 getter,setter,생성자,toString 메서드 생략 가능

    public static BoardDTO toBoardDTO(BoardEntity boardEntity){
        BoardDTO boardDTO = new BoardDTO();
        boardDTO.setBoardId(boardEntity.getBoardId());
        boardDTO.setBoardType(boardEntity.getBoardType());
        boardDTO.setAlgorithmId(boardEntity.getAlgorithmId());
        boardDTO.setUserId(boardEntity.getUserId());
        boardDTO.setTitle(boardEntity.getTitle());
        boardDTO.setContent(boardEntity.getContent());
        boardDTO.setCreatedTime(boardEntity.getCreatedTime());

        return boardDTO;
    }

}