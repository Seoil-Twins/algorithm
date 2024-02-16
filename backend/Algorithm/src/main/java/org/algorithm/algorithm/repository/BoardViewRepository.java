package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.BoardViewEntity;
import org.algorithm.algorithm.entity.RecommendBoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardViewRepository extends JpaRepository<BoardViewEntity, Long> {
    String countByBoardId(long boardId);

    BoardViewEntity findByBoardIdAndUserId(long boardId, long userId);
}
