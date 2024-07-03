package com.college.algorithm.repository;

import com.college.algorithm.entity.AppUser;
import com.college.algorithm.entity.BoardRecommend;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRecommendRepository extends JpaRepository<BoardRecommend, Long> {
    @EntityGraph(
            value = "BoardRecommend.getBoard",
            attributePaths = { "board" }
    )
    Page<BoardRecommend> findAllByUserAndBoardDeletedIsFalseOrderByCreatedTimeDesc(AppUser user, Pageable pageable);
}
