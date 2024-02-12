package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.AlgorithmKindEntity;
import org.algorithm.algorithm.entity.EmailVerifyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlgorithmKindRepository extends JpaRepository<AlgorithmKindEntity, Long> {
}