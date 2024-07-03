package com.college.algorithm.repository;

import com.college.algorithm.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findAllByCorrectCorrectId(Pageable pageable, Long correctId);
}
