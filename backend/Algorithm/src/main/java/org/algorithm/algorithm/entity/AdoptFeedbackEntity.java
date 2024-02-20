package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "adopt_feedback")
public class AdoptFeedbackEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adopt_feedback_id", columnDefinition = "INT UNSIGNED")
    private long adoptFeedbackId;
    @Column(name = "board_id", columnDefinition = "INT UNSIGNED")
    private long boardId;
}