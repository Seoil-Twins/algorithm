package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "recommend_comment_code")
public class RecommendCommentCodeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommend_comment_code_id", columnDefinition = "INT UNSIGNED")
    private long recommendCommentCodeId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private long userId;
    @Column(name = "comment_code_id", columnDefinition = "INT UNSIGNED")
    private long commentCodeId;
    @Column(name = "value")
    private long value;
}
