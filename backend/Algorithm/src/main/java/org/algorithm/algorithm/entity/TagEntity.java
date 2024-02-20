package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "tag")
public class TagEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id", columnDefinition = "INT UNSIGNED")
    private long tagId;
    @Column(name = "board_id", columnDefinition = "INT UNSIGNED")
    private long boardId;
    @Column(name = "value")
    private String value;
}
