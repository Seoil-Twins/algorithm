package com.college.algorithm.service;

import com.college.algorithm.dto.ResponseOtherUserDto;
import com.college.algorithm.entity.AppUser;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.mapper.UserMapper;
import com.college.algorithm.repository.AlgorithmRecommendRepository;
import com.college.algorithm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AlgorithmRecommendRepository algorithmRecommendRepository;

    public ResponseOtherUserDto getUser(long userId) {
        AppUser user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));


        int favorite = algorithmRecommendRepository.countByUser(user);

        return UserMapper.INSTANCE.toResponseOtherUserDto(user, favorite);
    }
}
