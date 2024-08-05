package com.college.algorithm.repository;

import com.college.algorithm.entity.Algorithm;
import com.college.algorithm.entity.AlgorithmRecommend;
import com.college.algorithm.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlgorithmRecommendRepository extends JpaRepository<AlgorithmRecommend, Long> {
    int countByUser(AppUser user);
    int countByAlgorithm_AlgorithmIdAndUserUserId(Long algorithm_algorithmId, Long user_userId);
    int countByAlgorithm_AlgorithmId(Long algorithm_algorithmId);
    boolean existsByAlgorithmAndUser_UserId(Algorithm algorithm, long userId);
    AlgorithmRecommend findByAlgorithm_AlgorithmIdAndUser_UserId(Long algorithm_algorithmId, Long user_userId);
}