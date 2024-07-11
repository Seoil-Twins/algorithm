package com.college.algorithm.repository;

import com.college.algorithm.entity.Try;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TryRepository extends JpaRepository<Try,Long> {

    int countByUser_UserId(Long userId);
}
