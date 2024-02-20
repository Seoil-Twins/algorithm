package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.AdoptEntity;
import org.algorithm.algorithm.entity.AdoptFeedbackEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdoptFeedbackRepository extends JpaRepository<AdoptFeedbackEntity, Long> {

    AdoptFeedbackEntity findByBoardId(long boardId);
}
