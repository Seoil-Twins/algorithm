package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.UserProfileEntity;
import org.algorithm.algorithm.entity.UserTryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTryRepository extends JpaRepository<UserTryEntity, Long> {
}
