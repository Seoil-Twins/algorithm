package com.college.algorithm.service;

import com.college.algorithm.dto.RequestBoardUpdateDto;
import com.college.algorithm.dto.RequestCommentUpdateDto;
import com.college.algorithm.entity.*;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.repository.CommentRecommendRepository;
import com.college.algorithm.repository.CommentRepository;
import com.college.algorithm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentRecommendRepository commentRecommendRepository;
    private final UserRepository userRepository;

    public HttpStatus postCommentRecommend(Long commentId, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Comment comment = commentRepository.findCommentByCommentId(commentId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COMMENT));

        if(commentRecommendRepository.findByComment_CommentIdAndUser_UserId(commentId, loginUserId) != null)
            throw new CustomException(ErrorCode.DUPLICATE_RECOMMEND);


        CommentRecommend recommend = new CommentRecommend(user, comment);

        commentRecommendRepository.save(recommend);
        comment.setRecommendCount(commentRecommendRepository.countByComment_CommentId(commentId));
        commentRepository.save(comment);

        return HttpStatus.CREATED;
    }

    public HttpStatus patchComment(RequestCommentUpdateDto commentUpdateDto, Long commentId, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Comment comment = commentRepository.findCommentByCommentId(commentId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COMMENT));

        if(!Objects.equals(user.getUserId(), comment.getUser().getUserId()))
            throw new CustomException(ErrorCode.NOT_MATCHED_USER);

        comment.setContent(commentUpdateDto.getContent());
        comment.setUpdatedTime(LocalDateTime.now());

        commentRepository.save(comment);

        return HttpStatus.OK;
    }

    public HttpStatus deleteCommentRecommend(Long commentId, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Comment comment = commentRepository.findCommentByCommentId(commentId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COMMENT));

        CommentRecommend recommend = commentRecommendRepository.findByComment_CommentIdAndUser_UserId(commentId, user.getUserId());

        if(recommend == null)
            throw new CustomException(ErrorCode.NOT_FOUND_RECOMMEND);

        if(!recommend.getUser().getUserId().equals(loginUserId))
            throw new CustomException(ErrorCode.NOT_MATCHED_USER);

        commentRecommendRepository.delete(recommend);
        comment.setRecommendCount(commentRecommendRepository.countByComment_CommentId(commentId));
        commentRepository.save(comment);

        return HttpStatus.OK;
    }

    public HttpStatus deleteComment(Long commentId, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Comment comment = commentRepository.findCommentByCommentId(commentId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_COMMENT));

        if(!comment.getUser().getUserId().equals(loginUserId))
            throw new CustomException(ErrorCode.NOT_MATCHED_USER);

        commentRepository.delete(comment);

        return HttpStatus.OK;
    }

}
