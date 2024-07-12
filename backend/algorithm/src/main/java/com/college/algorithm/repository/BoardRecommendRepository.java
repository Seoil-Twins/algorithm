package com.college.algorithm.repository;

import com.college.algorithm.entity.AlgorithmCorrectRecommend;
import com.college.algorithm.entity.BoardRecommend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRecommendRepository extends JpaRepository<BoardRecommend, Long> {
    int countByBoard_BoardIdAndUserUserId(Long board_boardId, Long user_userId);

    BoardRecommend findByBoard_BoardIdAndUser_UserId(Long board_boardId, Long user_userId);
    int countByBoard_BoardId(Long board_boardId);
}
