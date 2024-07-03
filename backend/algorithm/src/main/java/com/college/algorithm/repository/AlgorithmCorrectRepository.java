package com.college.algorithm.repository;

import com.college.algorithm.entity.AlgorithmCorrect;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlgorithmCorrectRepository extends JpaRepository<AlgorithmCorrect,Long> {
    Page<AlgorithmCorrect> findAllByAlgorithm_AlgorithmId(Pageable pageable, Long algorithmId);
    AlgorithmCorrect findByCorrectId(Long correctId);
}
