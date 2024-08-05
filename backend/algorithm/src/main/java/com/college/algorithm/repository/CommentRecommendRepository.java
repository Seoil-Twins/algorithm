package com.college.algorithm.repository;

import com.college.algorithm.entity.AlgorithmCorrectRecommend;
import com.college.algorithm.entity.CommentRecommend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRecommendRepository extends JpaRepository<CommentRecommend, Long> {
    CommentRecommend findByComment_CommentIdAndUser_UserId(Long comment_commentId, Long user_userId);
    int countByComment_CommentId(Long comment_commentId);
    List<CommentRecommend> findAllByUserUserIdAndCommentCommentIdIn(Long userId, List<Long> commentIds);
}
