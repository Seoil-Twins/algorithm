package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.RecommendBoardEntity;
import org.algorithm.algorithm.entity.RecommendCodeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RecommendBoardRepository extends JpaRepository<RecommendBoardEntity, Long> {
    RecommendBoardEntity findByBoardId(long boardId);
    RecommendBoardEntity findByBoardIdAndUserId(long boardId,long userId);
    @Query(value = "SELECT SUM(value) FROM recommend_board where board_id = :boardId",
            nativeQuery = true)
    String findCountByBoardId(long boardId);

}
