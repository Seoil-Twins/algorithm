package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity,Long> {
    List<CommentEntity> findCommentEntitiesByBoardId(long boardId);
}
