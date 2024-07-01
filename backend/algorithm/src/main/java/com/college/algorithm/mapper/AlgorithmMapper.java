package com.college.algorithm.mapper;

import com.college.algorithm.dto.AlgorithmDto;
import com.college.algorithm.dto.AlgorithmTestcaseDto;
import com.college.algorithm.dto.ResponseOtherUserDto;
import com.college.algorithm.entity.Algorithm;
import com.college.algorithm.entity.AlgorithmTestcase;
import com.college.algorithm.entity.AppUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

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
    @Mapping(source = "algorithm.createdTime", target = "createdTime")
    @Mapping(source = "algorithm.updatedTime", target = "updatedTime")
    AlgorithmDto toAlgorithmDto(Algorithm algorithm);

    @Mapping(source = "algorithmTestcase.testcaseId", target = "testcaseId")
    @Mapping(source = "algorithmTestcase.algorithm", target = "algorithm")
    @Mapping(source = "algorithmTestcase.input", target = "input")
    @Mapping(source = "algorithmTestcase.output", target = "output")
    AlgorithmTestcaseDto toAlgorithmTestcaseDto(AlgorithmTestcase algorithmTestcase);
}
