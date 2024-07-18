package com.college.algorithm.repository;

import com.college.algorithm.entity.BoardSuggest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardSuggestRepository extends JpaRepository<BoardSuggest,Long> {
    List<BoardSuggest> findAllByOrderByCreatedTimeDesc();
}
