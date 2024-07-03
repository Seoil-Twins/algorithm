package com.college.algorithm.mapper;

import com.college.algorithm.dto.*;
import com.college.algorithm.entity.*;
import org.hibernate.Hibernate;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(uses = CustomTimestampMapper.class)
public interface AlgorithmMapper {
    AlgorithmMapper INSTANCE = Mappers.getMapper(AlgorithmMapper.class);

    @Mapping(source = "algorithm.algorithmId", target = "algorithmId")
    @Mapping(source = "algorithm.user", target = "user")
    @Mapping(source = "algorithm.kind", target = "kind")
    @Mapping(source = "algorithm.compe", target = "compe")
    @Mapping(source = "algorithm.title", target = "title")
    @Mapping(source = "algorithm.content", target = "content")
    @Mapping(source = "algorithm.level", target = "level")
    @Mapping(source = "algorithm.limitTime", target = "limitTime")
    @Mapping(source = "algorithm.limitMemory", target = "limitMemory")
    @Mapping(source = "algorithm.recommendCount", target = "recommendCount")
    @Mapping(source = "algorithm.createdTime", target = "createdTime", qualifiedBy = { CustomTimestampTranslator.class, MapCreatedTime.class})
    @Mapping(source = "algorithm.updatedTime", target = "updatedTime", qualifiedBy = { CustomTimestampTranslator.class, MapCreatedTime.class})
    AlgorithmDto toAlgorithmDto(Algorithm algorithm);

    @Mapping(source = "algorithmTestcase.testcaseId", target = "testcaseId")
    @Mapping(source = "algorithmTestcase.algorithm", target = "algorithm")
    @Mapping(source = "algorithmTestcase.input", target = "input")
    @Mapping(source = "algorithmTestcase.output", target = "output")
    AlgorithmTestcaseDto toAlgorithmTestcaseDto(AlgorithmTestcase algorithmTestcase);

    @Mapping(source = "algorithm.algorithmId", target = "algorithmId")
    @Mapping(source = "algorithm.title", target = "title")
    @Mapping(source = "algorithm.kind.kindName", target = "kind")
    @Mapping(source = "algorithm.content", target = "content")
    @Mapping(source = "algorithm.limitTime", target = "limitTime")
    @Mapping(source = "algorithm.limitMemory", target = "limitMemory")
    @Mapping(source = "isRecommend", target = "isRecommend")
    @Mapping(source = "testcases", target = "testcases")
    AlgorithmDetailDto toAlgorithmDetailDto(Algorithm algorithm, boolean isRecommend, List<AlgorithmDetailTestcaseDto> testcases);

    @Mapping(source = "algorithm.title", target = "title")
    @Mapping(source = "algorithm.level", target = "level")
    @Mapping(source = "algorithm.kind.kindName", target = "kind")
    @Mapping(source = "explanation.content", target = "content")
    ExplanationResponseDto toExplanationResponseDto(Algorithm algorithm, Explanation explanation);

    @Mapping(source = "suggest.algorithm.algorithmId", target = "algorithmId")
    @Mapping(source = "suggest.algorithm.title", target = "title")
    @Mapping(source = "suggest.algorithm.kind.kindName", target = "kind")
    @Mapping(source = "suggest.algorithm.content", target = "content")
    AlgorithmSuggestDto toAlgorithmSuggestDto(AlgorithmSuggest suggest);

    @Mapping(source = "correct.correctId", target = "correctId")
    @Mapping(source = "user", target = "user")
    @Mapping(source = "correct.code", target = "code")
    @Mapping(source = "correct.recommendCount", target = "recommendCount")
    AlgorithmCorrectDto toAlgorithmCorrectDto(AlgorithmCorrect correct, ResponseAlgorithmUserDto user);

    @Mapping(source = "comment.commentId", target = "commentId")
    @Mapping(source = "user", target = "user")
    @Mapping(source = "comment.content", target = "content")
    @Mapping(source = "comment.recommendCount", target = "recommendCount")
    @Mapping(source = "comment.createdTime", target = "createdTime", qualifiedBy = { CustomTimestampTranslator.class, MapCreatedTime.class})
    CorrectCommentDto toCorrectCommentDto(Comment comment, ResponseAlgorithmUserDto user);
}
