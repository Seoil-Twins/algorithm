package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.BoardImageEntity;
import org.algorithm.algorithm.entity.UserProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardImageRepository extends JpaRepository<BoardImageEntity, Long> {
    BoardImageEntity findByBoardImageId(long boardId);
}
