package com.college.algorithm.repository;

import com.college.algorithm.entity.Algorithm;
import com.college.algorithm.entity.AlgorithmImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlgorithmImageRepository extends JpaRepository<AlgorithmImage, Long> {
    AlgorithmImage findFirstByAlgorithmOrderByCreatedTimeAsc(Algorithm algorithm);
}
