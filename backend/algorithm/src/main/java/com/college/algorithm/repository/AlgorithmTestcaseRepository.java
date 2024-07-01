package com.college.algorithm.repository;

import com.college.algorithm.entity.AlgorithmTestcase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlgorithmTestcaseRepository extends JpaRepository<AlgorithmTestcase, Long> {
    List<AlgorithmTestcase> findTestcaseEntitiesByAlgorithmAlgorithmId(long algorithmId);
}
