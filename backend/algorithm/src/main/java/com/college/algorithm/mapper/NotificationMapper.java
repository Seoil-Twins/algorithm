package com.college.algorithm.mapper;

import com.college.algorithm.dto.NotificationDto;
import com.college.algorithm.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(uses = CustomTimestampMapper.class)
public interface NotificationMapper {
    NotificationMapper INSTANCE = Mappers.getMapper(NotificationMapper.class);

    @Mapping(source = "notification.notificationType", target = "notificationType")
    @Mapping(source = "notification.fromUser.userId", target = "fromUser.userId")
    @Mapping(source = "notification.fromUser.profilePath", target = "fromUser.profile")
    @Mapping(source = "fromUser.nickname", target = "fromUser.nickname")
    @Mapping(source = "notification.notice.noticeId", target = "notice.noticeId")
    @Mapping(source = "notification.notice.title", target = "notice.title")
    @Mapping(source = "notification.board.boardId", target = "board.boardId")
    @Mapping(source = "notification.board.boardType", target = "board.boardTypeId", qualifiedByName = "mapBoardType")
    @Mapping(source = "notification.board.title", target = "board.title")
    @Mapping(source = "notification.comment.commentId", target = "comment.commentId")
    @Mapping(source = "notification.comment.content", target = "comment.content")
    @Mapping(source = "notification.algorithm.algorithmId", target = "algorithm.algorithmId")
    @Mapping(source = "notification.createdTime", target = "createdTime", qualifiedBy = { CustomTimestampTranslator.class, MapCreatedTime.class })
    NotificationDto toNotificationDto(Notification notification);

    @Named("mapBoardType")
    default Character mapBoardType(BoardType boardType) {
        return boardType.getTypeId();
    }
}
