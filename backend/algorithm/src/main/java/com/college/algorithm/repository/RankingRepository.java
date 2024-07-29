package com.college.algorithm.repository;

import com.college.algorithm.entity.Ranking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankingRepository extends JpaRepository<Ranking, Long> {
    Page<Ranking> findAllByOrderBySolveCountDesc(Pageable pageable);
}
