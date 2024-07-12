package com.college.algorithm.repository;

import com.college.algorithm.entity.AlgorithmCorrectRecommend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlgorithmCorrectRecommendRepository extends JpaRepository<AlgorithmCorrectRecommend, Long> {
    AlgorithmCorrectRecommend findByCorrect_CorrectIdAndUser_UserId(Long correct_correctId,Long user_userId);
    int countByCorrect_CorrectId(Long correct_correctId);
}
