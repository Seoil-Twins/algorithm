package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.ExplanationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExplanationRepository  extends JpaRepository<ExplanationEntity, Long> {

    @Query(value = "SELECT * " +
            "FROM explanation " +
            "WHERE algorithm_id = :algorithmId",
            nativeQuery = true)
    ExplanationEntity findByAlgorithmId(@Param("algorithmId") Long algorithmId);

}
