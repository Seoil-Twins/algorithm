package com.college.algorithm.repository;

import com.college.algorithm.entity.BoardType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardTypeRepository extends JpaRepository<BoardType, Character> {
    BoardType findAllByTypeName(String names);
    List<BoardType> findAllByTypeNameIn(List<String> names);
}
