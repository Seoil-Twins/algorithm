package com.college.algorithm.mapper;

import com.college.algorithm.dto.BoardIntroDto;
import com.college.algorithm.entity.Board;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = CustomTimestampMapper.class)
public interface BoardMapper {
    BoardMapper INSTANCE = Mappers.getMapper(BoardMapper.class);

    @Mapping(source = "board.boardId", target = "boardId")
    @Mapping(source = "board.title", target = "title")
    @Mapping(source = "board.content", target = "content")
    @Mapping(source = "board.recommendCount", target = "likeCount")
    @Mapping(source = "board.commentCount", target = "commentCount")
    @Mapping(source = "board.isSolved", target = "isSolved")
    @Mapping(source = "board.createdTime", target = "createdTime", qualifiedBy = { CustomTimestampTranslator.class, MapCreatedTime.class })
    BoardIntroDto toResponseBoardIntroDto(Board board);

    @Mapping(source = "board.boardId", target = "boardId")
    @Mapping(source = "board.title", target = "title")
    @Mapping(source = "board.content", target = "content")
    @Mapping(source = "board.recommendCount", target = "likeCount")
    @Mapping(source = "board.commentCount", target = "commentCount")
    @Mapping(target = "isSolved", expression = "java(null)")
    @Mapping(source = "board.createdTime", target = "createdTime", qualifiedBy = { CustomTimestampTranslator.class, MapCreatedTime.class })
    BoardIntroDto toResponseBoardIntroWithoutSolvedDto(Board board);
}
