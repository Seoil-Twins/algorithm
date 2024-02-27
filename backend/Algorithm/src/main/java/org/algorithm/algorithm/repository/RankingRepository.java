package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.BoardEntity;
import org.algorithm.algorithm.entity.FavoriteEntity;
import org.algorithm.algorithm.entity.RankingEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RankingRepository extends JpaRepository<RankingEntity, Long> {
    Page<RankingEntity> findAll(Pageable pageable);
//    Page<RankingEntity> findRankingEntities (Pageable pageable);

}

