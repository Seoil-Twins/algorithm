package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "recommend_comment")
public class RecommendCommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommend_comment_id", columnDefinition = "INT UNSIGNED")
    private long recommendCommentId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private long userId;
    @Column(name = "comment_id", columnDefinition = "INT UNSIGNED")
    private long commentId;
    @Column(name = "value")
    private long value;
}
