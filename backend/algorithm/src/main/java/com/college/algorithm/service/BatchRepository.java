package com.college.algorithm.service;

import com.college.algorithm.entity.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BatchRepository extends JpaRepository<Ranking,Long> {

    @Query(value = "SELECT u.user_id, COUNT(t.try_id) AS solved_count\n" +
            "FROM app_user u\n" +
            "JOIN try t ON u.user_id = t.user_id\n" +
            "WHERE t.solved = true\n" +
            "GROUP BY u.user_id, u.nickname\n" +
            "ORDER BY solved_count DESC\n" +
            "LIMIT 20;", nativeQuery = true)
    List<Object[]> findRankings();

    @Query(value = "SELECT \n" +
            "    b.board_id,\n" +
            "    b.title, \n" +
            "    COALESCE(bv.view_count, 0) AS views, \n" +
            "    COALESCE(br.like_count, 0) AS likes, \n" +
            "    COALESCE(c.comment_count, 0) AS comments,\n" +
            "    (COALESCE(bv.view_count, 0) * 1) + \n" +
            "    (COALESCE(br.like_count, 0) * 10) + \n" +
            "    (COALESCE(c.comment_count, 0) * 5) AS weighted_score\n" +
            "FROM \n" +
            "    board b\n" +
            "LEFT JOIN \n" +
            "    (SELECT board_id, COUNT(*) AS view_count FROM board_view GROUP BY board_id) bv ON b.board_id = bv.board_id\n" +
            "LEFT JOIN \n" +
            "    (SELECT board_id, COUNT(*) AS like_count FROM board_recommend GROUP BY board_id) br ON b.board_id = br.board_id\n" +
            "LEFT JOIN \n" +
            "    (SELECT board_id, COUNT(*) AS comment_count FROM comment GROUP BY board_id) c ON b.board_id = c.board_id\n" +
            "ORDER BY \n" +
            "    weighted_score DESC\n" +
            "LIMIT 20;", nativeQuery = true)
    List<Object[]> findBoards();

    @Query(value = "SELECT \n" +
            "    a.algorithm_id, \n" +
            "    a.title, \n" +
            "    COALESCE(ar.like_count, 0) AS likes, \n" +
            "    COALESCE(t.try_count, 0) AS tries,\n" +
            "    (COALESCE(ar.like_count, 0) * 5) + \n" +
            "    (COALESCE(t.try_count, 0) * 1) AS weighted_score\n" +
            "FROM \n" +
            "    algorithm a\n" +
            "LEFT JOIN \n" +
            "    (SELECT algorithm_id, COUNT(*) AS like_count FROM algorithm_recommend GROUP BY algorithm_id) ar ON a.algorithm_id = ar.algorithm_id\n" +
            "LEFT JOIN \n" +
            "    (SELECT algorithm_id, COUNT(*) AS try_count FROM try GROUP BY algorithm_id) t ON a.algorithm_id = t.algorithm_id\n" +
            "ORDER BY \n" +
            "    weighted_score DESC\n" +
            "LIMIT 20;", nativeQuery = true)
    List<Object[]> findAlgorithm();
}
