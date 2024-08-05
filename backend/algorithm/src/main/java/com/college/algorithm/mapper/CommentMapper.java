package com.college.algorithm.mapper;

import com.college.algorithm.dto.ResponseMyCommentDto;
import com.college.algorithm.entity.Board;
import com.college.algorithm.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = CustomTimestampMapper.class)
public interface CommentMapper {

    CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

    @Mapping(source = "board.boardId", target = "boardId")
    @Mapping(source = "board.boardType.typeId", target = "boardType")
    @Mapping(source = "comment.content", target = "title")
    @Mapping(source = "board.title", target = "content")
    @Mapping(source = "comment.recommendCount", target = "likeCount")
    @Mapping(source = "isSolved", target = "isSolved")
    @Mapping(source = "comment.createdTime", target = "createdTime", qualifiedBy = { CustomTimestampTranslator.class, MapCreatedTime.class })
    ResponseMyCommentDto.CommentDto toResponseCommentDto(Board board, Comment comment, Boolean isSolved);

    @Mapping(source = "board.boardId", target = "boardId")
    @Mapping(source = "board.boardType.typeId", target = "boardType")
    @Mapping(source = "comment.content", target = "title")
    @Mapping(source = "board.title", target = "content")
    @Mapping(source = "comment.recommendCount", target = "likeCount")
    @Mapping(target = "isSolved", expression = "java(null)")
    @Mapping(source = "comment.createdTime", target = "createdTime", qualifiedBy = { CustomTimestampTranslator.class, MapCreatedTime.class })
    ResponseMyCommentDto.CommentDto toResponseCommentWithoutSolvedDto(Board board, Comment comment);
}
