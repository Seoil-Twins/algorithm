package com.college.algorithm.repository;

import com.college.algorithm.entity.AppUser;
import com.college.algorithm.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @EntityGraph(value = "Comment.getBoard", attributePaths = {
            "board"
    }, type = EntityGraph.EntityGraphType.LOAD)
    Page<Comment> findAllByUserAndBoardDeletedIsFalseOrderByCreatedTimeDesc(AppUser user, Pageable pageable);
  
    Page<Comment> findAllByCorrectCorrectIdOrderByCreatedTimeDesc(Pageable pageable, Long correctId);
  
    Page<Comment> findAllByBoardBoardId(Pageable pageable, Long boardId);

    Optional<Comment> findCommentByCommentId(Long commentId);

    List<Comment> findAllByCommentIdIn(List<Long> commentIds);
}
