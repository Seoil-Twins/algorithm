package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.dto.MyPageAnswerInterface;
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

    @Query(value = "SELECT board.*, COUNT(board_view.board_id) AS views " +
            "FROM board " +
            "LEFT JOIN board_view ON board.board_id = board_view.board_id " +
            "WHERE board.user_id = :userId AND board.board_type IN (4)" +
            "GROUP BY board.board_id, board.title, board.content, board.user_id;", nativeQuery = true)
    List<BoardEntity> findFeedbackByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT board.*, COUNT(board_view.board_id) AS views " +
            "FROM board " +
            "LEFT JOIN board_view ON board.board_id = board_view.board_id " +
            "WHERE board.user_id = :userId AND board.board_type IN (2)" +
            "GROUP BY board.board_id, board.title, board.content, board.user_id;", nativeQuery = true)
    List<BoardEntity> findFreeByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT board.board_id, " +
            "board.board_type, " +
            "comment.content AS title, " +
            "        board.title AS content," +
            "        CASE WHEN board.solved = comment.comment_id THEN true ELSE false END AS solved, " +
            "        COUNT(board_view.board_id) AS views, " +
            "        board.created_time " +
            "FROM board " +
            "LEFT JOIN board_view ON board.board_id = board_view.board_id " +
            "LEFT JOIN comment ON board.board_id = comment.board_id " +
            "WHERE comment.user_id = :userId AND board.board_type IN (1, 3) " +
            "GROUP BY board.board_id, board.title, board.content, board.user_id, comment.content, comment.comment_id;", nativeQuery = true)
    List<MyPageAnswerInterface> findAnswerByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT board.* " +
            "FROM board\n" +
            "WHERE board.board_id IN (\n" +
            "    SELECT target_id \n" +
            "    FROM favorite \n" +
            "    WHERE user_id = :userId\n" +
            ")\n" +
            "GROUP BY board.board_id, board.board_type, board.title, board.content, board.solved, board.created_time;", nativeQuery = true)
    List<BoardEntity> findFavoriteBoardByUserId(@Param("userId") Long userId);

    @Query(value = "select type_name from board_type where board_type_id = 1;", nativeQuery = true)
    String find1Type();

    @Query(value = "select type_name from board_type where board_type_id = 2;", nativeQuery = true)
    String find2Type();

    @Query(value = "select type_name from board_type where board_type_id = 3;", nativeQuery = true)
    String find3Type();

    @Query(value = "select type_name from board_type where board_type_id = 4;", nativeQuery = true)
    String find4Type();
}
