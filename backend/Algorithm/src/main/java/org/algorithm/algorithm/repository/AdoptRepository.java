package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.AdoptEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdoptRepository extends JpaRepository<AdoptEntity, Long> {
    AdoptEntity findByBoardId(long boardId);

    @Query(value = "SELECT comment_id FROM adopt where board_id = :boardId",
            nativeQuery = true)
    String findCommentIdByBoardId(long boardId);
}
