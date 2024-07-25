package com.college.algorithm.repository;

import com.college.algorithm.entity.Board;
import com.college.algorithm.entity.BoardImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardImageRepository extends JpaRepository<BoardImage,Long> {
    List<BoardImage> findAllByBoard(Board board);
    BoardImage findByBoardOrderByCreatedTimeAsc(Board board);
}
