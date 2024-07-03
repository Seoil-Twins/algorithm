package com.college.algorithm.mapper;

import com.college.algorithm.dto.ResponseAlgorithmUserDto;
import com.college.algorithm.dto.ResponseOtherUserDto;
import com.college.algorithm.entity.AppUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = CustomTimestampMapper.class)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.nickname", target = "nickname")
    @Mapping(source = "user.profilePath", target = "profile")
    @Mapping(source = "user.tried", target = "tried")
    @Mapping(source = "user.solved", target = "solved")
    @Mapping(source = "favorite", target = "favorite")
    ResponseOtherUserDto toResponseOtherUserDto(AppUser user, int favorite);

    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.profilePath", target = "profile")
    @Mapping(source = "user.nickname", target = "nickname")
    ResponseAlgorithmUserDto toResponseAlgorithmUserDto(AppUser user);
}
