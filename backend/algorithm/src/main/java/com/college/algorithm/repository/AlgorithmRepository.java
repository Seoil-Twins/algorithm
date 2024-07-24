package com.college.algorithm.repository;

import com.college.algorithm.entity.Algorithm;
import com.college.algorithm.entity.AlgorithmKind;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AlgorithmRepository extends JpaRepository<Algorithm, Long>, JpaSpecificationExecutor<Algorithm> {

    Page<Algorithm> findAll(Pageable pageable);

    Optional<Algorithm> findAlgorithmByAlgorithmId(Long algorithmId);

    @Query(value = "SELECT COUNT(*)" +
            " FROM try " +
            "WHERE algorithm_id = :algorithmId",
            nativeQuery = true)
    float findTriedByAlgorithmId(@Param("algorithmId") Long algorithmId);


    @Query(value = "SELECT COUNT(*)" +
            " FROM try " +
            "WHERE algorithm_id = :algorithmId AND solved = 1",
            nativeQuery = true)
    float findCorrectByAlgorithmId(@Param("algorithmId") Long algorithmId);
}
