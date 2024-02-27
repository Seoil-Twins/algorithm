package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.BoardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    BoardEntity findBoardEntityByBoardIdOrderByCreatedTime(long boardId);
    Page<BoardEntity> findBoardEntitiesByBoardTypeOrderByCreatedTimeDesc(Pageable pageable, long boardType);
    Page<BoardEntity> findBoardEntitiesByBoardTypeInOrderByCreatedTimeDesc(Pageable pageable, List<Long> boardTypes);

    Page<BoardEntity> findBoardEntitiesByBoardTypeAndAlgorithmIdOrderByCreatedTimeDesc(Pageable pageable, Long boardType, Long algorithmId);
    Page<BoardEntity> findBoardEntitiesByBoardTypeInAndAlgorithmIdOrderByCreatedTimeDesc(Pageable pageable, List<Long> boardTypes, Long algorithmId);

    @Query(value = "SELECT b.* " +
            "FROM board b " +
            "INNER JOIN ( " +
            "    SELECT board_id, COUNT(board_id) AS view_count " +
            "    FROM board_view " +
            "    WHERE created_time >= DATE_SUB(NOW(), INTERVAL 7 DAY) " +
            "    GROUP BY board_id " +
            "    ORDER BY view_count DESC " +
            "    LIMIT 6 " +
            ") bv ON b.board_id = bv.board_id;",
            nativeQuery = true)
    List<BoardEntity> findRecommendedBoardEntities();
    @Query(value = "SELECT COUNT(*) FROM comment where board_id = :boardId",
            nativeQuery = true)
    String findCommentCountByBoardId(long boardId);

    @Query(value = "SELECT board.* " +
            "FROM board " +
            "LEFT JOIN board_view ON board.board_id = board_view.board_id " +
            "WHERE board.user_id = :userId AND board.board_type IN (1, 3)" +
            "GROUP BY board.board_id, board.title, board.content, board.user_id;", nativeQuery = true)
    List<BoardEntity> findQuestionByUserId(@Param("userId") long userId);

}
