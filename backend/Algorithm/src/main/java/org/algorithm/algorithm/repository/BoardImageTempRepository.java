package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.BoardImageEntity;
import org.algorithm.algorithm.entity.BoardImageTempEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardImageTempRepository extends JpaRepository<BoardImageTempEntity, Long> {
    List<BoardImageTempEntity> findAllByUserId(Long userId);
}

