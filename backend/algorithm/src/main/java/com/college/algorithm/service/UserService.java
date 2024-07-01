package com.college.algorithm.service;

import com.college.algorithm.dto.*;
import com.college.algorithm.entity.AppUser;
import com.college.algorithm.entity.EmailVerify;
import com.college.algorithm.entity.UserLink;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.mapper.UserMapper;
import com.college.algorithm.repository.AlgorithmRecommendRepository;
import com.college.algorithm.repository.EmailVerifyRepository;
import com.college.algorithm.repository.UserLinkRepository;
import com.college.algorithm.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AlgorithmRecommendRepository algorithmRecommendRepository;
    private final EmailVerifyRepository emailVerifyRepository;
    private final UserLinkRepository userLinkRepository;

    private final PasswordEncoder passwordEncoder;

    public ResponseUserDto getMyInfo(String userId) {
        AppUser user = userRepository.findByUserId(Long.parseLong(userId))
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        return UserMapper.INSTANCE.toResponseUserDto(user);
    }

    public ResponseOtherUserDto getUser(long userId) {
        AppUser user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        int favorite = algorithmRecommendRepository.countByUser(user);

        return UserMapper.INSTANCE.toResponseOtherUserDto(user, favorite);
    }

    public ResponseUserLinkDto getLink(String userId) {
        AppUser user = userRepository.findByUserId(Long.parseLong(userId))
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        List<UserLink> links = userLinkRepository.findAllByUser(user);
        List<ResponseUserLinkDto.LinkDto> linkDtos = links.stream()
                .map(UserMapper.INSTANCE::toResponseLinkDto)
                .toList();

        return new ResponseUserLinkDto(linkDtos);
    }

    public Long login(RequestLoginDto dto) {
        AppUser user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        if (!passwordEncoder.matches(dto.getUserPw(), user.getUserPw())) { throw new CustomException(ErrorCode.NOT_MATCH_PASSWORD); }
        return user.getUserId();
    }

    public void signup(RequestSignupDto dto) {
        boolean hasNicknameUser = userRepository.existsByNickname(dto.getNickname());
        boolean hasEmailUser = userRepository.existsByEmail(dto.getEmail());
        if (hasNicknameUser) { throw new CustomException(ErrorCode.DUPLICATE_PARAMETER_NICKNAME); }
        if (hasEmailUser) { throw new CustomException(ErrorCode.DUPLICATE_PARAMETER_EMAIL); }

        EmailVerify emailVerify = emailVerifyRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_VERIFIED_EMAIL));
        if (!emailVerify.getVerified()) { throw new CustomException(ErrorCode.NOT_VERIFIED_EMAIL); }

        String encryptedPassword = passwordEncoder.encode(dto.getUserPw());

        AppUser user = AppUser.builder()
                .email(dto.getEmail())
                .userPw(encryptedPassword)
                .nickname(dto.getNickname())
                .build();

        userRepository.save(user);
    }

    @Transactional
    public void addLink(String userId, RequestLinkDto dto) {
        AppUser user = userRepository.findByUserId(Long.parseLong(userId))
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        UserLink link = userLinkRepository.findByUserAndLinkKind(user, dto.getLinkKind().getKindId());

        if (link == null) {
            link = UserLink.builder()
                    .user(user)
                    .linkKind(dto.getLinkKind().getKindId())
                    .domain(dto.getDomain())
                    .build();
        } else {
            link.setDomain(dto.getDomain());
        }

        userLinkRepository.save(link);
    }
}
