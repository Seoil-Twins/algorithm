package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.RecommendBoardEntity;
import org.algorithm.algorithm.entity.RecommendCodeEntity;
import org.algorithm.algorithm.entity.RecommendCommentCodeEntity;
import org.algorithm.algorithm.entity.RecommendCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendCommentRepository extends JpaRepository<RecommendCommentEntity, Long>{
    RecommendCommentEntity findByCommentId(long commentId);
    RecommendCommentEntity findByCommentIdAndUserId(long commentId,long userId);
    String countByCommentId(long commentId);
}
