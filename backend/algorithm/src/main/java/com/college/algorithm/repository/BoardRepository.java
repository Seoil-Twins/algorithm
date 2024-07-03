package com.college.algorithm.repository;

import com.college.algorithm.entity.AppUser;
import com.college.algorithm.entity.Board;
import com.college.algorithm.entity.BoardType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAllByBoardTypeInAndUserAndDeletedIsFalseOrderByCreatedTimeDesc(
            List<BoardType> boardTypes,
            AppUser user,
            Pageable pageable);

    Page<Board> findAllByUserAndAdoptIsNotNullAndDeletedIsFalseOrderByCreatedTimeDesc(
            AppUser user,
            Pageable pageable
    );
}
