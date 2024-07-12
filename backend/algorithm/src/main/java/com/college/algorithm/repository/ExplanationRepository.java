package com.college.algorithm.repository;

import com.college.algorithm.entity.Explanation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExplanationRepository extends JpaRepository<Explanation, Long> {
    Explanation findExplanationByAlgorithm_AlgorithmId(Long algorithmId);
}
