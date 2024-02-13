package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.CommentCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentCodeRepository extends JpaRepository<CommentCodeEntity, Long> {
    CommentCodeEntity[] findByCodeId(Long codeId);
}
