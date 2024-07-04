package com.college.algorithm.repository;

import com.college.algorithm.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag,Long> {
    List<Tag> findAllByBoard_BoardId(Long boardId);
}
