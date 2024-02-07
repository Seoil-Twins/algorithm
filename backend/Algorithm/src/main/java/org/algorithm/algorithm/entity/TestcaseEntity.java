package org.algorithm.algorithm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "algorithm_testcase")
public class TestcaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "testcase_id", columnDefinition = "INT UNSIGNED")
    private long testcaseId;
    @Column(name = "algorithm_id", columnDefinition = "INT UNSIGNED")
    private long algorithmId;
    @Column(name = "input")
    private String input;
    @Column(name = "output")
    private String output;
}
