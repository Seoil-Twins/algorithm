package com.college.algorithm.repository;

import com.college.algorithm.entity.AppUser;
import com.college.algorithm.entity.UserLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserLinkRepository extends JpaRepository<UserLink, Long> {
    UserLink findByUserAndLinkKind(AppUser user, String linkKind);
    List<UserLink> findAllByUser(AppUser user);
}
