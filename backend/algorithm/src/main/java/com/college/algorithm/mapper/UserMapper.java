package com.college.algorithm.mapper;

import com.college.algorithm.dto.*;
import com.college.algorithm.entity.AppUser;
import com.college.algorithm.entity.UserLink;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = CustomTimestampMapper.class)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.nickname", target = "nickname")
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.profilePath", target = "profile")
    @Mapping(source = "user.tried", target = "tried")
    @Mapping(source = "user.solved", target = "solved")
    ResponseUserDto toResponseUserDto(AppUser user);

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.nickname", target = "nickname")
    @Mapping(source = "user.profilePath", target = "profile")
    @Mapping(source = "user.tried", target = "tried")
    @Mapping(source = "user.solved", target = "solved")
    @Mapping(source = "favorite", target = "favorite")
    ResponseOtherUserDto toResponseOtherUserDto(AppUser user, int favorite);

    @Mapping(source = "link.linkKind", target = "linkKind")
    @Mapping(source = "link.domain", target = "domain")
    @Mapping(source = "link.createdTime", target = "createdTime", qualifiedBy = { CustomTimestampTranslator.class, MapCreatedTime.class })
    ResponseUserLinkDto.LinkDto toResponseLinkDto(UserLink link);

    @Mapping(source = "user.tried", target = "tried")
    @Mapping(source = "user.solved", target = "solved")
    @Mapping(source = "favorite", target = "favorite")
    ResponseMyAlgorithmDto toResponseMyAlgorithmDto(AppUser user, int favorite);

    @Mapping(source = "user.primaryNofi", target = "primaryNofi")
    @Mapping(source = "user.commentNofi", target = "commentNofi")
    @Mapping(source = "user.likeNofi", target = "likeNofi")
    @Mapping(source = "user.answerNofi", target = "answerNofi")
    @Mapping(source = "user.eventNofi", target = "eventNofi")
    ResponseNotificationSettingsDto toResponseNotificationSettingsDto(AppUser user);

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.profilePath", target = "profile")
    @Mapping(source = "user.nickname", target = "nickname")
    ResponseAlgorithmUserDto toResponseAlgorithmUserDto(AppUser user);

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.profilePath", target = "profile")
    @Mapping(source = "user.nickname", target = "nickname")
    ResponseBoardUserDto toResponseBoardUserDto(AppUser user);

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.profilePath", target = "profile")
    @Mapping(source = "user.nickname", target = "nickname")
    ResponseRankingUserDto toResponseRankingUserDto(AppUser user);
}
