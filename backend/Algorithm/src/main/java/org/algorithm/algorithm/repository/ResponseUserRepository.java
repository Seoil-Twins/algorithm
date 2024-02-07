package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.ResponseUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponseUserRepository extends JpaRepository<ResponseUserEntity, Long> {
    ResponseUserEntity findDefaultByUserId(long userId);
}