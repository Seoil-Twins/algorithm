package com.college.algorithm.service;

import com.college.algorithm.dto.AlgorithmDto;
import com.college.algorithm.dto.AlgorithmSearchRequestDto;
import com.college.algorithm.dto.AlgorithmTestcaseDto;
import com.college.algorithm.entity.Algorithm;
import com.college.algorithm.entity.AlgorithmTestcase;
import com.college.algorithm.exception.BadRequestException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.mapper.AlgorithmMapper;
import com.college.algorithm.repository.AlgorithmRepository;
import com.college.algorithm.repository.AlgorithmTestcaseRepository;
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
    private final AlgorithmRepository algorithmRepository;
    private final AlgorithmTestcaseRepository testcaseRepository;


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
                times.add(algorithmDTO.getCreatedTime());
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
            throw new BadRequestException(ErrorCode.BAD_REQUEST); // 잠깐만 이거임, SQLException 넣어야함.
        }
    }
}
