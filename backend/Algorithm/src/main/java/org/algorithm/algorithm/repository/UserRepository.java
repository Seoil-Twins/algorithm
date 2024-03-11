package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.BoardEntity;
import org.algorithm.algorithm.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);
    UserEntity findByUserId(long userId);
    UserEntity findByNickname(String nickname);

    @Query(value = "SELECT anno_nofi,post_nofi,comment_nofi,like_nofi,answer_nofi,event_nofi" +
            " FROM user " +
            "WHERE user_id = :userId",
            nativeQuery = true)
    String findNotificationByUserId(@Param("userId") int userId);

    @Query(value = "SELECT link_id,link_kind,domain, created_time FROM user_link WHERE user_id = :userId", nativeQuery = true)
    String[] findLinksByUserId(@Param("userId") String userId);
    @Query(value = "SELECT " +
            "    (SELECT COUNT(*) FROM user_try WHERE user_id = :userId) AS tried,\n" +
            "    (SELECT COUNT(*) FROM user_try WHERE user_id = :userId AND solved = true) AS solved,\n" +
            "    (SELECT COUNT(*) FROM favorite WHERE user_id = :userId) AS favorite", nativeQuery = true)
    String findSolvedByUserId(@Param("userId") int userId);




    @Query(value = "SELECT \tboard.board_id,\n" +
            "\t\tboard.board_type,\n" +
            "\t\tcomment.content AS title, \n" +
            "        board.title AS content,\n" +
            "        COUNT(board_view.board_id) AS views,\n" +
            "        board.created_time\n" +
            "FROM board\n" +
            "LEFT JOIN board_view ON board.board_id = board_view.board_id\n" +
            "LEFT JOIN comment ON board.board_id = comment.board_id\n" +
            "WHERE comment.user_id = :userId AND board.board_type IN (2)\n" +
            "GROUP BY board.board_id, board.title, board.content, board.user_id, comment.content, comment.comment_id;", nativeQuery = true)
    String[] findCommentByUserId(@Param("userId") int userId);

    @Query(value = "SELECT \tboard.board_id,\n" +
            "\t\tboard.board_type,\n" +
            "        board.title,\n" +
            "\t\tboard.content,\n" +
            "         (SELECT COUNT(*) FROM comment WHERE board_id = board.board_id) AS commentCount,\n" +
            "        board.solved,\n" +
            "         (SELECT COUNT(*) FROM board_view WHERE board.board_id = board_view.board_id) AS view,\n" +
            "        board.created_time\n" +
            "FROM board\n" +
            "LEFT JOIN board_view ON board.board_id = board_view.board_id\n" +
            "LEFT JOIN comment ON board.board_id = comment.board_id\n" +
            "WHERE board.board_id IN (\n" +
            "    SELECT target_id \n" +
            "    FROM favorite \n" +
            "    WHERE user_id = :userId\n" +
            ")\n" +
            "GROUP BY board.board_id, board.board_type, board.title, board.content, board.solved, board.created_time;", nativeQuery = true)
    String[] findFavoriteBoardByUserId(@Param("userId") int userId);


    @Query(value = "SELECT COUNT(*) FROM recommend_board WHERE board_id = :boardId", nativeQuery = true)
    String findRecommendByBoardId(@Param("boardId") String boardId);


}
