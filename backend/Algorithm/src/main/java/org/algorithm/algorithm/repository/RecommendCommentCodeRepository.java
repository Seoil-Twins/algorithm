package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.RecommendCodeEntity;
import org.algorithm.algorithm.entity.RecommendCommentCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendCommentCodeRepository extends JpaRepository<RecommendCommentCodeEntity, Long>{
    RecommendCommentCodeEntity findByCommentCodeId(long commentCodeId);
    RecommendCommentCodeEntity findByCommentCodeIdAndUserId(long commentCodeId,long userId);
}
