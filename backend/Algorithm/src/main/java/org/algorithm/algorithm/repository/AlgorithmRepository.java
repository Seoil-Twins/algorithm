package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.AlgorithmEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlgorithmRepository extends JpaRepository<AlgorithmEntity, Long> {

    AlgorithmEntity findOneByAlgorithmId(long algorithmId);
    Page<AlgorithmEntity> findAll(Pageable pageable);
    @Query(value = "SELECT * " +
            "FROM algorithm " +
            "WHERE algorithm_id IN (SELECT algorithm_id FROM user_try WHERE user_id = :userId)",
            nativeQuery = true)
    Page<AlgorithmEntity> findTriedByUserId(@Param("userId") long userId, Pageable pageable);

    @Query(value = "SELECT * FROM (\n" +
            "    SELECT a.*\n" +
            "    FROM algorithm a\n" +
            "    JOIN (\n" +
            "        SELECT algorithm_id, COUNT(*) AS attempts\n" +
            "        FROM user_try\n" +
            "        WHERE created_time >= NOW() - INTERVAL 7 DAY\n" +
            "        GROUP BY algorithm_id\n" +
            "        ORDER BY attempts DESC\n" +
            "        LIMIT 6\n" +
            "    ) AS ut ON a.algorithm_id = ut.algorithm_id\n" +
            ") AS result;",
            nativeQuery = true)
    List<AlgorithmEntity> findRecommend();

    @Query(value = "SELECT kind_name" +
            " FROM algorithm_kind " +
            "WHERE kind_id = :kindId",
            nativeQuery = true)
    String findKindByKindId(@Param("kindId") Long kindId);
    @Query(value = "SELECT COUNT(*)" +
            " FROM user_try " +
            "WHERE algorithm_id = :algorithmId AND user_id = :userId AND solved = 1",
            nativeQuery = true)
    int findSolvedByAlgorithmIdANDUserId(@Param("algorithmId") Long algorithmId, @Param("userId") Long userId);

    @Query(value = "SELECT COUNT(*)" +
            " FROM user_try " +
            "WHERE algorithm_id = :algorithmId",
            nativeQuery = true)
    float findTriedByAlgorithmId(@Param("algorithmId") Long algorithmId);

    @Query(value = "SELECT COUNT(*)" +
            " FROM user_try " +
            "WHERE algorithm_id = :algorithmId AND solved = 1",
            nativeQuery = true)
    float findCorrectByAlgorithmId(@Param("algorithmId") Long algorithmId);

    @Query(value = "SELECT path" +
            " FROM algorithm_image " +
            "WHERE algorithm_id = :algorithmId",
            nativeQuery = true)
    String[] findImagePathByAlgorithmId(@Param("algorithmId") Long algorithmId);


    @Query(value = "SELECT a.* " +
            "FROM algorithm a " +
            "JOIN user_try ut ON a.algorithm_id = ut.algorithm_id " +
            "WHERE ut.user_id = :userId " +
            "ORDER BY ut.created_time DESC;",
            nativeQuery = true)
    List<AlgorithmEntity> findTriedByUserId(@Param("userId") Long userId);
}
