package com.college.algorithm.repository;

import com.college.algorithm.entity.AppUser;
import com.college.algorithm.entity.Board;
import com.college.algorithm.entity.BoardType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAllByBoardTypeInAndUserAndDeletedIsFalseOrderByCreatedTimeDesc(
            List<BoardType> boardTypes,
            AppUser user,
            Pageable pageable);

    Page<Board> findAllByUserAndAdoptIdIsNotNullAndDeletedIsFalseOrderByCreatedTimeDesc(
            AppUser user,
            Pageable pageable
    );
    @EntityGraph(
            value = "board.getBoard",
            attributePaths = { "user" }
    )
    Page<Board> findAllByBoardType_TypeIdInAndTitleContainingOrderByCreatedTimeDesc(Pageable pageable, List<Character> typeIds, String keyword);
    Page<Board> findAllByBoardType_TypeIdInAndTitleContainingAndAlgorithm_AlgorithmIdOrderByCreatedTimeDesc(Pageable pageable, List<Character> typeIds, String keyword, Long algorithmId);
    Optional<Board> findByBoardId(Long boardId);
}
