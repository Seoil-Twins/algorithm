package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TagRepository extends JpaRepository<TagEntity,Long> {


    @Query(value = "SELECT value FROM tag where board_id = :boardId",
            nativeQuery = true)
    List<String> findValuesByBoardId(long boardId);
}
