package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.UserProfileEntity;
import org.algorithm.algorithm.entity.UserTryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserTryRepository extends JpaRepository<UserTryEntity, Long> {

    @Query(value="SELECT COUNT(*) FROM user_try WHERE user_id = :userId GROUP BY user_id ORDER BY COUNT(*) DESC", nativeQuery = true)
    String findCountByUserId (@Param("userId") Long userId);
}
