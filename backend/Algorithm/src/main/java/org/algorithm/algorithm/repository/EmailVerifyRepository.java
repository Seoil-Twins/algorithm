package org.algorithm.algorithm.repository;

import org.algorithm.algorithm.entity.EmailVerifyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailVerifyRepository extends JpaRepository<EmailVerifyEntity, Long> {
    EmailVerifyEntity findByEmail(String email);
}
