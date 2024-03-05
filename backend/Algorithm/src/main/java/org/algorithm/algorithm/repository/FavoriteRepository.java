package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.FavoriteEntity;
import org.algorithm.algorithm.entity.RankingEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Long> {


    @Query(value = "SELECT COUNT(*)" +
            " FROM favorite " +
            "WHERE user_id = :#{#favoriteEntity.userId} AND target_id = :#{#favoriteEntity.targetId} AND target_type = 2",
            nativeQuery = true)
    int findCountByUserIdANDAlgorithmId(@Param("favoriteEntity") FavoriteEntity favoriteEntity);

    FavoriteEntity findFavoriteEntityByTargetIdAndTargetTypeAndUserId(long targetId, long targetType, long userId);

    Page<FavoriteEntity> findAll(Pageable pageable);
}
