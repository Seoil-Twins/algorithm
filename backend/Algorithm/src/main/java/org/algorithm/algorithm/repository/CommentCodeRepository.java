package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.CommentCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentCodeRepository extends JpaRepository<CommentCodeEntity, Long> {
    CommentCodeEntity[] findByCodeId(Long codeId);
    CommentCodeEntity findByCommentCodeId(Long commendCodeId);
    CommentCodeEntity findCommentCodeEntityByCommentCodeId(Long commentCodeId);

    @Query(value = "SELECT SUM(value) FROM recommend_comment_code where comment_code_id = :commentCodeId",
            nativeQuery = true)
    String findRecommendByCommentCodeId(@Param("commentCodeId") long commentCodeId);
}
