package com.college.algorithm.repository;

import com.college.algorithm.entity.BoardType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardTypeRepository extends JpaRepository<BoardType, Long> {
    List<BoardType> findAll();
    BoardType findBoardTypeByTypeName(String typeName);
    BoardType findBoardTypeByTypeId(Character typeId);
}
