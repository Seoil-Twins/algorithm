package com.college.algorithm.repository;

import com.college.algorithm.entity.BoardView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardViewRepository extends JpaRepository<BoardView,Long> {
    int countByBoard_BoardIdAndUserUserId(Long board_boardId, Long user_userId);
    int countByBoard_BoardId(Long board_boardId);
    BoardView findByBoard_BoardIdAndUserUserId(Long board_boardId, Long user_userId);
}
