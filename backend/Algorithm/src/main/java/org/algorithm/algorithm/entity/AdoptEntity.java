package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "adopt")
public class AdoptEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adopt_id", columnDefinition = "INT UNSIGNED")
    private long adoptId;
    @Column(name = "board_id", columnDefinition = "INT UNSIGNED")
    private long boardId;
    @Column(name = "comment_id", columnDefinition = "INT UNSIGNED")
    private long commentId;
}