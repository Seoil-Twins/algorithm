package com.college.algorithm.repository;

import com.college.algorithm.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findAllByCorrectCorrectId(Pageable pageable, Long correctId);
    Page<Comment> findAllByBoardBoardId(Pageable pageable, Long boardId);

    Optional<Comment> findCommentByCommentId(Long commentId);
}
