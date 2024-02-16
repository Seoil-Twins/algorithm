package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.RecommendCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendCodeRepository extends JpaRepository<RecommendCodeEntity, Long> {
    RecommendCodeEntity findByCodeId(long codeId);
    RecommendCodeEntity findByCodeIdAndUserId(long codeId,long userId);
}
