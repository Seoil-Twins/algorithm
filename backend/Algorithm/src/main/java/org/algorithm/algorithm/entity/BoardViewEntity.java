package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "board_view")
public class BoardViewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_view_id", columnDefinition = "INT UNSIGNED")
    private long boardViewId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private long userId;
    @Column(name = "board_id", columnDefinition = "INT UNSIGNED")
    private long boardId;
}
