package com.college.algorithm.service;

import com.college.algorithm.dto.*;
import com.college.algorithm.entity.*;
import com.college.algorithm.exception.BadRequestException;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.mapper.AlgorithmMapper;
import com.college.algorithm.mapper.UserMapper;
import com.college.algorithm.repository.*;
import com.college.algorithm.util.AlgorithmSpecification;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AlgorithmService {
    private final UserRepository userRepository;

    private final AlgorithmRepository algorithmRepository;
    private final AlgorithmTestcaseRepository testcaseRepository;
    private final AlgorithmSuggestRepository suggestRepository;
    private final AlgorithmRecommendRepository recommendRepository;
    private final AlgorithmKindRepository kindRepository;
    private final AlgorithmCorrectRepository correctRepository;
    private final AlgorithmCorrectRecommendRepository correctRecommendRepository;
    private final ExplanationRepository explanationRepository;
    private final CommentRepository commentRepository;


    public ObjectNode getAll(AlgorithmSearchRequestDto algorithmRequestDTO) {
        try {
            System.out.println(algorithmRequestDTO);
            Pageable pageable = null;

            if ("r".equals(algorithmRequestDTO.getSort())) { // "r"이면 내림차순
                pageable = PageRequest.of(algorithmRequestDTO.getPage()-1, algorithmRequestDTO.getCount(), Sort.by("createdTime").descending());
            } else { // "or"이면 오름차순
                pageable = PageRequest.of(algorithmRequestDTO.getPage()-1, algorithmRequestDTO.getCount(), Sort.by("createdTime").ascending());
            }

            Page<Algorithm> algorithmEntities = algorithmRepository.findAll(
                    AlgorithmSpecification.withDynamicQuery(
                            algorithmRequestDTO.getLevel(),
                            algorithmRequestDTO.getTag(),
                            algorithmRequestDTO.getKeyword()),
                    pageable
            );
            long total = algorithmEntities.getTotalElements();


            ObjectMapper objectMapper = new ObjectMapper();

            List<Algorithm> resultValue = algorithmEntities.getContent();
            ArrayNode response = objectMapper.createArrayNode();

            List<LocalDateTime> times = new ArrayList<>();



            for (Algorithm algorithmEntity : resultValue) {
                AlgorithmDto algorithmDTO = AlgorithmMapper.INSTANCE.toAlgorithmDto(algorithmEntity);

                // algorithmId로 testcase 찾아와서 node 생성
                List<AlgorithmTestcase> testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmAlgorithmId(algorithmDTO.getAlgorithmId());
                ArrayNode testcaseArrayNode = objectMapper.createArrayNode();
                if (testcaseEntities == null)
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
                for (AlgorithmTestcase testcaseEntitiy : testcaseEntities) {
                    AlgorithmTestcaseDto testcaseDTO = AlgorithmMapper.INSTANCE.toAlgorithmTestcaseDto(testcaseEntitiy);


                    ObjectNode testcaseNode = objectMapper.createObjectNode();
                    testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
                    testcaseNode.put("algorithmId", testcaseDTO.getAlgorithm().getAlgorithmId());
                    testcaseNode.put("input", testcaseDTO.getInput());
                    testcaseNode.put("output", testcaseDTO.getOutput());
                    testcaseArrayNode.add(testcaseNode);
                }

                float tried = algorithmRepository.findTriedByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correct = algorithmRepository.findCorrectByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correctRate = 0.0f;
                if(tried > 0)
                    correctRate = correct / tried;

                ObjectNode dtoNode = objectMapper.createObjectNode();

                dtoNode.put("algorithmId",algorithmDTO.getAlgorithmId());
                dtoNode.put("title",algorithmDTO.getTitle());
                dtoNode.put("level",algorithmDTO.getLevel().toString());
                dtoNode.put("kind",algorithmDTO.getKind().getKindName());
//                dtoNode.put("limitTime",algorithmDTO.getLimitTime());
//                dtoNode.put("limitMem",algorithmDTO.getLimitMemory());
//                dtoNode.put("createdTime", String.valueOf(algorithmDTO.getCreatedTime()));
//                dtoNode.put("content",algorithmDTO.getContent());
//                dtoNode.put("testcase",testcaseArrayNode);
                dtoNode.put("correctRate",Math.round(correctRate*100));
                dtoNode.put("solved", (JsonNode) null);
                response.add(dtoNode);
            }

            List<JsonNode> list = new ArrayList<>();
            ArrayNode sortedResponse = objectMapper.createArrayNode();

            if(Objects.equals(algorithmRequestDTO.getRate(), "h")) {
                response.forEach(list::add);

                // correctRate를 기준으로 내림차순 정렬
                list.sort(Comparator.comparing((JsonNode node) -> node.get("correctRate").asInt()).reversed());

                // 정렬된 데이터를 새로운 ArrayNode에 추가
                list.forEach(sortedResponse::add);
            } else if(Objects.equals(algorithmRequestDTO.getRate(), "l")) {
                response.forEach(list::add);

                // correctRate를 기준으로 오름차순 정렬
                list.sort(Comparator.comparing((JsonNode node) -> node.get("correctRate").asInt()));

                // 정렬된 데이터를 새로운 ArrayNode에 추가
                list.forEach(sortedResponse::add);
            } else {
                response.forEach(sortedResponse::add);
            }

            ObjectNode responseJSON = objectMapper.createObjectNode();
            responseJSON.set("algorithms", sortedResponse);
            responseJSON.put("total",total);

            System.out.println(times);

            return responseJSON;
        }
        catch (Error e){
            throw new BadRequestException(ErrorCode.SQL_EXCEPTION); // 잠깐만 이거임, SQLException 넣어야함.
        }
    }
    public ObjectNode getAll(AlgorithmSearchRequestDto algorithmRequestDTO, Long loginUserId) {
        try {
            System.out.println(algorithmRequestDTO);
            Pageable pageable = null;

            if ("r".equals(algorithmRequestDTO.getSort())) { // "r"이면 내림차순
                pageable = PageRequest.of(algorithmRequestDTO.getPage()-1, algorithmRequestDTO.getCount(), Sort.by("createdTime").descending());
            } else { // "or"이면 오름차순
                pageable = PageRequest.of(algorithmRequestDTO.getPage()-1, algorithmRequestDTO.getCount(), Sort.by("createdTime").ascending());
            }

            Page<Algorithm> algorithmEntities = algorithmRepository.findAll(
                    AlgorithmSpecification.withDynamicQuery(
                            algorithmRequestDTO.getLevel(),
                            algorithmRequestDTO.getTag(),
                            algorithmRequestDTO.getKeyword()),
                    pageable
            );
            long total = algorithmEntities.getTotalElements();


            ObjectMapper objectMapper = new ObjectMapper();

            List<Algorithm> resultValue = algorithmEntities.getContent();
            ArrayNode response = objectMapper.createArrayNode();

            List<LocalDateTime> times = new ArrayList<>();

            // boolean solved = loginUserId와 algorithmId로 검사하기.

            for (Algorithm algorithmEntity : resultValue) {
                AlgorithmDto algorithmDTO = AlgorithmMapper.INSTANCE.toAlgorithmDto(algorithmEntity);

                // algorithmId로 testcase 찾아와서 node 생성
                List<AlgorithmTestcase> testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmAlgorithmId(algorithmDTO.getAlgorithmId());
                ArrayNode testcaseArrayNode = objectMapper.createArrayNode();
                if (testcaseEntities == null)
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
                for (AlgorithmTestcase testcaseEntitiy : testcaseEntities) {
                    AlgorithmTestcaseDto testcaseDTO = AlgorithmMapper.INSTANCE.toAlgorithmTestcaseDto(testcaseEntitiy);


                    ObjectNode testcaseNode = objectMapper.createObjectNode();
                    testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
                    testcaseNode.put("algorithmId", testcaseDTO.getAlgorithm().getAlgorithmId());
                    testcaseNode.put("input", testcaseDTO.getInput());
                    testcaseNode.put("output", testcaseDTO.getOutput());
                    testcaseArrayNode.add(testcaseNode);
                }

                float tried = algorithmRepository.findTriedByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correct = algorithmRepository.findCorrectByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correctRate = 0.0f;
                if(tried > 0)
                    correctRate = correct / tried;

                ObjectNode dtoNode = objectMapper.createObjectNode();

                dtoNode.put("algorithmId",algorithmDTO.getAlgorithmId());
                dtoNode.put("title",algorithmDTO.getTitle());
                dtoNode.put("level",algorithmDTO.getLevel().toString());
                dtoNode.put("kind",algorithmDTO.getKind().getKindName());
//                dtoNode.put("limitTime",algorithmDTO.getLimitTime());
//                dtoNode.put("limitMem",algorithmDTO.getLimitMemory());
//                dtoNode.put("createdTime", String.valueOf(algorithmDTO.getCreatedTime()));
//                dtoNode.put("content",algorithmDTO.getContent());
//                dtoNode.put("testcase",testcaseArrayNode);
                dtoNode.put("correctRate",Math.round(correctRate*100));
                dtoNode.put("solved", (JsonNode) null);
                response.add(dtoNode);
            }

            List<JsonNode> list = new ArrayList<>();
            ArrayNode sortedResponse = objectMapper.createArrayNode();

            if(Objects.equals(algorithmRequestDTO.getRate(), "h")) {
                response.forEach(list::add);

                // correctRate를 기준으로 내림차순 정렬
                list.sort(Comparator.comparing((JsonNode node) -> node.get("correctRate").asInt()).reversed());

                // 정렬된 데이터를 새로운 ArrayNode에 추가
                list.forEach(sortedResponse::add);
            } else if(Objects.equals(algorithmRequestDTO.getRate(), "l")) {
                response.forEach(list::add);

                // correctRate를 기준으로 오름차순 정렬
                list.sort(Comparator.comparing((JsonNode node) -> node.get("correctRate").asInt()));

                // 정렬된 데이터를 새로운 ArrayNode에 추가
                list.forEach(sortedResponse::add);
            } else {
                response.forEach(sortedResponse::add);
            }

            ObjectNode responseJSON = objectMapper.createObjectNode();
            responseJSON.set("algorithms", sortedResponse);
            responseJSON.put("total",total);

            System.out.println(times);

            return responseJSON;
        }
        catch (Error e){
            throw new CustomException(ErrorCode.SQL_EXCEPTION); // 잠깐만 이거임, SQLException 넣어야함.
        }
    }

    public AlgorithmSuggestResponseDto getSuggestAlgorithms(){

        List<AlgorithmSuggest> algorithms = suggestRepository.findAll();

        if(algorithms.isEmpty())
            throw new CustomException(ErrorCode.NOT_FOUND_SUGGEST);

        AlgorithmSuggestResponseDto response = new AlgorithmSuggestResponseDto();
        List<AlgorithmSuggestDto> dtos = new ArrayList<>();

        for(AlgorithmSuggest algorithmSuggest : algorithms)
            dtos.add(AlgorithmMapper.INSTANCE.toAlgorithmSuggestDto(algorithmSuggest));

        response.setAlgorithms(dtos);

        return response;
    }
    public AlgorithmDetailDto getAlgorithmDetail(Long algorithmId, Long loginUserId){
        Algorithm algorithmEntity = algorithmRepository.findAlgorithmByAlgorithmId(algorithmId);

        if(algorithmEntity == null)
            throw new CustomException(ErrorCode.NOT_FOUND_ALGORITHM);

        // algorithmId로 testcase 찾아와서 node 생성
        List<AlgorithmTestcase> testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmAlgorithmId(algorithmId);
        List<AlgorithmDetailTestcaseDto> testcases = new ArrayList<>();
        if (testcaseEntities == null)
            throw new CustomException(ErrorCode.SQL_EXCEPTION);

        for (AlgorithmTestcase testcaseEntitiy : testcaseEntities) {
            AlgorithmTestcaseDto testcaseDTO = AlgorithmMapper.INSTANCE.toAlgorithmTestcaseDto(testcaseEntitiy);
            AlgorithmDetailTestcaseDto testcase = new AlgorithmDetailTestcaseDto();
            testcase.setInput(testcaseDTO.getInput());
            testcase.setOutput(testcaseDTO.getOutput());
            testcases.add(testcase);
        }

        // algorithmId 및 loginUserId로 추천 점검
        boolean isRecommend = true;
        if(loginUserId != null)
             isRecommend = recommendRepository.countByAlgorithm_AlgorithmIdAndUserUserId(algorithmId, loginUserId) >= 1;

        AlgorithmDetailDto response = AlgorithmMapper.INSTANCE.toAlgorithmDetailDto(algorithmEntity,isRecommend,testcases);

        return response;
    }
    public ExplanationResponseDto getExplanation(Long algorithmId){

        Algorithm algorithmEntity = algorithmRepository.findAlgorithmByAlgorithmId(algorithmId);
        if(algorithmEntity == null)
            throw new CustomException(ErrorCode.NOT_FOUND_ALGORITHM);

        Explanation explanation = explanationRepository.findExplanationByAlgorithm_AlgorithmId(algorithmId);
        if(explanation == null)
            throw new CustomException(ErrorCode.NOT_FOUND_EXPLANATION);

        ExplanationResponseDto response = AlgorithmMapper.INSTANCE.toExplanationResponseDto(algorithmEntity,explanation);

        return response;
    }
    public AlgorithmKindResponseDto getKinds(){

        List<AlgorithmKind> kinds = kindRepository.findAll();
        AlgorithmKindResponseDto response = new AlgorithmKindResponseDto();
        List<AlgorithmKindDto> kindDtos = new ArrayList<>();

        for(AlgorithmKind kind : kinds){
            AlgorithmKindDto kindDto = new AlgorithmKindDto();
            kindDto.setKindId(Integer.parseInt(kind.getKindId()));
            kindDto.setKindName(kind.getKindName());
            kindDtos.add(kindDto);
        }
        response.setKinds(kindDtos);

        return response;
    }
    public ResponseCorrectDto getCorrects(Long algorithmId, int page, int count){
        Pageable pageable = PageRequest.of(page-1, count, Sort.by("createdTime").descending());
        int total = 0;

        if(algorithmRepository.findAlgorithmByAlgorithmId(algorithmId) == null)
            throw new CustomException(ErrorCode.NOT_FOUND_ALGORITHM);

        Page<AlgorithmCorrect> corrects = correctRepository.findAllByAlgorithm_AlgorithmId(pageable, algorithmId);

        List<AlgorithmCorrectDto> dtos = new ArrayList<>();

        for(AlgorithmCorrect correct : corrects) {
            ResponseAlgorithmUserDto user = UserMapper.INSTANCE.toResponseAlgorithmUserDto(correct.getUser());
            dtos.add(AlgorithmMapper.INSTANCE.toAlgorithmCorrectDto(correct,user));
            total++;
        }

        return new ResponseCorrectDto(dtos,total);
    }
    public ResponseCorrectCommentDto getCorrectComments(Long correctId, int page, int count){
        Pageable pageable = PageRequest.of(page-1, count, Sort.by("createdTime").ascending());
        int total = 0;

        if(correctRepository.findByCorrectId(correctId) == null)
            throw new CustomException(ErrorCode.NOT_FOUND_CORRECT);

        Page<Comment> comments = commentRepository.findAllByCorrectCorrectId(pageable, correctId);

        List<CorrectCommentDto> dtos = new ArrayList<>();

        for(Comment comment : comments) {
            ResponseAlgorithmUserDto user = UserMapper.INSTANCE.toResponseAlgorithmUserDto(comment.getUser());
            dtos.add(AlgorithmMapper.INSTANCE.toCorrectCommentDto(comment,user));
            total++;
        }

        return new ResponseCorrectCommentDto(dtos,total);
    }
    public HttpStatus postCorrectComment(Long correctId, RequestCorrectComment requestCorrectComment, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        AlgorithmCorrect correct = correctRepository.findByCorrectId(correctId);
        if(correct == null)
            throw new CustomException(ErrorCode.NOT_FOUND_CORRECT);

        Comment comment = new Comment(user, null, correct, requestCorrectComment.getContent());

        commentRepository.save(comment);

        return HttpStatus.CREATED;
    }
    public HttpStatus postCorrectRecommend(Long correctId, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        AlgorithmCorrect correct = correctRepository.findByCorrectId(correctId);
        if(correct == null)
            throw new CustomException(ErrorCode.NOT_FOUND_CORRECT);

        if(correctRecommendRepository.findByCorrect_CorrectIdAndUser_UserId(correctId, loginUserId) != null)
            throw new CustomException(ErrorCode.DUPLICATE_CORRECT_RECOMMEND);


        AlgorithmCorrectRecommend recommend = new AlgorithmCorrectRecommend(user, correct);

        correctRecommendRepository.save(recommend);
        correct.setRecommendCount(correctRecommendRepository.countByCorrect_CorrectId(correctId));
        correctRepository.save(correct);

        return HttpStatus.CREATED;
    }

    public HttpStatus deleteCorrectRecommend(Long correctId, Long loginUserId){

        AppUser user = userRepository.findByUserId(loginUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        AlgorithmCorrect correct = correctRepository.findByCorrectId(correctId);
        if(correct == null)
            throw new CustomException(ErrorCode.NOT_FOUND_CORRECT);

        AlgorithmCorrectRecommend recommend = correctRecommendRepository.findByCorrect_CorrectIdAndUser_UserId(correctId, user.getUserId());

        if(recommend == null)
            throw new CustomException(ErrorCode.NOT_FOUND_CORRECT_RECOMMEND);

        if(!recommend.getUser().getUserId().equals(loginUserId))
            throw new CustomException(ErrorCode.NOT_MATCHED_USER);

        correctRecommendRepository.delete(recommend);
        correct.setRecommendCount(correctRecommendRepository.countByCorrect_CorrectId(correctId));
        correctRepository.save(correct);

        return HttpStatus.OK;
    }
}
