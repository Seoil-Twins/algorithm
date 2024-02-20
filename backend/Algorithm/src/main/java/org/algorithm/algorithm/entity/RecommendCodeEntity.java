package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "recommend_code")
public class RecommendCodeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recommend_code_id", columnDefinition = "INT UNSIGNED")
    private long recommendCodeId;
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private long userId;
    @Column(name = "code_id", columnDefinition = "INT UNSIGNED")
    private long codeId;
    @Column(name = "value")
    private long value;
}
