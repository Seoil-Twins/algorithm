package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.TestcaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestcaseRepository extends JpaRepository<TestcaseEntity, Long> {
    TestcaseEntity findByAlgorithmId(long algorithmId);

    TestcaseEntity[] findTestcaseEntitiesByAlgorithmId(long algorithmId);
}