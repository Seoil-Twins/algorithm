package com.college.algorithm.repository;

import com.college.algorithm.entity.Algorithm;
import com.college.algorithm.entity.AlgorithmCorrect;
import com.college.algorithm.entity.CodeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlgorithmCorrectRepository extends JpaRepository<AlgorithmCorrect,Long> {
    @EntityGraph(
            value = "Correct.getCorrect",
            attributePaths = { "user" }
    )
    Page<AlgorithmCorrect> findAllByAlgorithmAndCodeType_TypeIdOrderByCreatedTimeDesc(Pageable pageable, Algorithm algorithm, String typeId);
    AlgorithmCorrect findByCorrectId(Long correctId);
    int countByAlgorithm_AlgorithmIdAndUser_UserId(Long algorithm_algorithmId, Long user_userId);
}
