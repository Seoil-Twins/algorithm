package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "recommend_board")
public class RecommendBoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommend_board_id", columnDefinition = "INT UNSIGNED")
    private long recommendBoardId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private long userId;
    @Column(name = "board_id", columnDefinition = "INT UNSIGNED")
    private long boardId;
    @Column(name = "value")
    private long value;
}
