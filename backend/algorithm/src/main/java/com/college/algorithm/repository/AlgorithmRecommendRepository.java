package com.college.algorithm.repository;

import com.college.algorithm.entity.AlgorithmRecommend;
import com.college.algorithm.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlgorithmRecommendRepository extends JpaRepository<AlgorithmRecommend, Long> {
    int countByUser(AppUser user);
}