package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.UserLinkEntity;
import org.algorithm.algorithm.entity.UserProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserLinkRepository extends JpaRepository<UserLinkEntity, Long> {
}
