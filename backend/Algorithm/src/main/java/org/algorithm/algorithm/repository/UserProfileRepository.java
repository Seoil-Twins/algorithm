package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.UserProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfileEntity, Long> {
    UserProfileEntity findByUserId(long userId);
    UserProfileEntity findUserProfileEntityByUserId(long userId);
}
