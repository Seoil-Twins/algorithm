package com.college.algorithm.repository;

import com.college.algorithm.entity.AlgorithmSuggest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlgorithmSuggestRepository extends JpaRepository<AlgorithmSuggest, Long> {
    List<AlgorithmSuggest> findAll();
}
