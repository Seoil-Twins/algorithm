package com.college.algorithm.repository;

import com.college.algorithm.entity.AppUser;
import com.college.algorithm.entity.BoardRecommend;
import com.college.algorithm.entity.AlgorithmCorrectRecommend;
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
  
    int countByBoard_BoardIdAndUserUserId(Long board_boardId, Long user_userId);
  
    BoardRecommend findByBoard_BoardIdAndUser_UserId(Long board_boardId, Long user_userId);
  
    int countByBoard_BoardId(Long board_boardId);
}
