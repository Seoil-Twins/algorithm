package com.college.algorithm.repository;

import com.college.algorithm.entity.AlgorithmKind;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlgorithmKindRepository extends JpaRepository<AlgorithmKind, Long> {
    List<AlgorithmKind> findAll();
}
