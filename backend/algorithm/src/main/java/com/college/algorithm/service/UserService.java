package com.college.algorithm.service;

import com.college.algorithm.dto.*;
import com.college.algorithm.entity.*;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.mapper.BoardMapper;
import com.college.algorithm.mapper.CommentMapper;
import com.college.algorithm.mapper.UserMapper;
import com.college.algorithm.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AlgorithmRecommendRepository algorithmRecommendRepository;
    private final EmailVerifyRepository emailVerifyRepository;
    private final UserLinkRepository userLinkRepository;
    private final BoardTypeRepository boardTypeRepository;
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;

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

    public ResponseMyAlgorithmDto getMyAlgorithmHistory(String userId) {
        AppUser user = userRepository.findByUserId(Long.parseLong(userId))
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        int favorite = algorithmRecommendRepository.countByUser(user);

        return UserMapper.INSTANCE.toResponseMyAlgorithmDto(user, favorite);
    }

    public ResponseNotificationSettingsDto getNotificationSettings(String userId) {
        AppUser user = userRepository.findByUserId(Long.parseLong(userId))
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        return UserMapper.INSTANCE.toResponseNotificationSettingsDto(user);
    }

    public ResponseMyBoardHistoryDto getMyHistory(long userId, int page, int count, List<String> types) {
        Pageable pageable = PageRequest.of(page - 1, count);

        AppUser user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        List<BoardType> boardTypes = boardTypeRepository.findAllByTypeNameIn(types);
        if (boardTypes == null || boardTypes.isEmpty()) { throw new CustomException(ErrorCode.NOT_FOUND_BOARD_TYPE); }

        Page<Board> boardPage = boardRepository.findAllByBoardTypeInAndUserAndDeletedIsFalseOrderByCreatedTimeDesc(
                boardTypes,
                user,
                pageable
        );

        List<Board> boards = boardPage.getContent();
        List<BoardIntroDto> introDtos = null;
        boolean isFreeBoard = boardTypes.stream().allMatch((type) -> type.getTypeName().equals(com.college.algorithm.type.BoardType.GENERAL_FREE.getTypeName()));

        if (isFreeBoard) {
            introDtos = boards.stream()
                    .map(BoardMapper.INSTANCE::toResponseBoardIntroWithoutSolvedDto)
                    .toList();
        } else {
            introDtos = boards.stream()
                    .map(BoardMapper.INSTANCE::toResponseBoardIntroDto)
                    .toList();
        }

        long total = boardPage.getTotalElements();

        return new ResponseMyBoardHistoryDto(introDtos, total);
    }

    public ResponseMyCommentDto getMyAdopt(long userId, int page, int count) {
        Pageable pageable = PageRequest.of(page - 1, count);

        AppUser user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Page<Board> boardPage = boardRepository.findAllByUserAndAdoptIsNotNullAndDeletedIsFalseOrderByCreatedTimeDesc(
                user,
                pageable
        );
        List<Board> boards = boardPage.getContent();

        List<ResponseMyCommentDto.CommentDto> commentDtos = boards.stream()
                .map((board) -> CommentMapper.INSTANCE.toResponseCommentWithoutSolvedDto(board, board.getAdopt()))
                .toList();
        long total = boardPage.getTotalElements();

        return new ResponseMyCommentDto(commentDtos, total);
    }

    public ResponseMyCommentDto getMyComment(long userId, int page, int count) {
        Pageable pageable = PageRequest.of(page - 1, count);

        AppUser user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        Page<Comment> commentPage = commentRepository.findAllByUserAndBoardDeletedIsFalseOrderByCreatedTimeDesc(
                user,
                pageable
        );
        List<Comment> comments = commentPage.getContent();

        List<ResponseMyCommentDto.CommentDto> commentDtos = comments.stream()
                .map((comment) -> CommentMapper.INSTANCE.toResponseCommentDto(comment.getBoard(), comment))
                .toList();
        long total = commentPage.getTotalElements();

        return new ResponseMyCommentDto(commentDtos, total);
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
