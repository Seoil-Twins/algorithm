package org.algorithm.algorithm.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.CodeDTO;
import org.algorithm.algorithm.dto.ResponseUserDTO;
import org.algorithm.algorithm.entity.CodeEntity;
import org.algorithm.algorithm.entity.ResponseUserEntity;
import org.algorithm.algorithm.repository.CodeRepository;
import org.algorithm.algorithm.repository.ResponseUserRepository;
import org.algorithm.algorithm.util.CodeRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CodeService {

    public final CodeRepository codeRepository;
    public final ResponseUserRepository responseUserRepository;

    public ObjectNode getAllCode(int pageNo, int pageSize) {
        try {
            Pageable pageable = PageRequest.of(pageNo, pageSize);
            Page<CodeEntity> codeEntities = codeRepository.findAll(pageable);

            List<CodeEntity> resultValue = codeEntities.getContent();
            List<ObjectNode> responseList = new ArrayList<>();

            for (CodeEntity codeEntity : resultValue) {
                CodeDTO codeDTO = CodeDTO.toCodeDTO(codeEntity);
                ObjectNode codeNode = createCodeNode(codeDTO);
                responseList.add(codeNode);
            }

            return createResultNode(responseList);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to get code.", e);
        }
    }

    public ObjectNode getSpecificCode(Long codeId) {
        try {
            CodeEntity codeEntity = codeRepository.findCodeEntityByCodeId(codeId);

            CodeDTO codeDTO = CodeDTO.toCodeDTO(codeEntity);
            ObjectNode codeNode = createCodeNode(codeDTO);

            return codeNode;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to get code.", e);
        }
    }

    public ObjectNode getCodeByAlgorithmId(int pageNo, int pageSize, Long algorithmId) {
        try {
            Pageable pageable = PageRequest.of(pageNo, pageSize);
            Page<CodeEntity> codeEntities = codeRepository.findCodeEntitiesByAlgorithmId(pageable,algorithmId);

            List<CodeEntity> resultValue = codeEntities.getContent();
            List<ObjectNode> responseList = new ArrayList<>();

            for (CodeEntity codeEntity : resultValue) {
                CodeDTO codeDTO = CodeDTO.toCodeDTO(codeEntity);
                ObjectNode codeNode = createCodeNode(codeDTO);
                responseList.add(codeNode);
            }

            return createResultNode(responseList);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to get code.", e);
        }
    }

    public String postCode(CodeDTO codeDTO) {
        try {
            CodeRunner codeRunner = new CodeRunner();
//            codeRunner.runC(codeDTO);
//            codeRunner.runCpp(codeDTO);
            codeRunner.runPython(codeDTO);
            return "created";
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to get code.", e);
        }
    }

    private ObjectNode createCodeNode(CodeDTO codeDTO) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode codeNode = objectMapper.createObjectNode();

        // userId로 user data 가져와서 node 생성
        ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(codeDTO.getUserId());
        ResponseUserDTO responseUserDTO = ResponseUserDTO.toResponseUserDTO(userEntity);

        ObjectNode userNode = objectMapper.createObjectNode();
        userNode.put("userId", responseUserDTO.getUserId());
        userNode.put("profile", responseUserDTO.getProfile());
        userNode.put("nickname", responseUserDTO.getNickname());

        // codeId로 recommend 추출
        String recommend = codeRepository.findRecommendByCodeId(codeDTO.getCodeId());

        codeNode.put("codeId", codeDTO.getCodeId());
        codeNode.set("user", userNode);
        codeNode.put("algorithmId", codeDTO.getAlgorithmId());
        codeNode.put("code", codeDTO.getCode());
        codeNode.put("type", codeDTO.getType());
        codeNode.put("solved", codeDTO.getSolved());
        codeNode.put("recommend", recommend);
        codeNode.put("createdTime", String.valueOf(codeDTO.getCreatedTime()));

        return codeNode;
    }

    private ObjectNode createResultNode(List<ObjectNode> responseList) {
        ObjectMapper objectMapper = new ObjectMapper();
        ArrayNode codesArrayNode = objectMapper.createArrayNode();

        for (ObjectNode node : responseList) {
            codesArrayNode.add(node);
        }

        ObjectNode resultNode = objectMapper.createObjectNode();
        resultNode.set("codes", codesArrayNode);

        return resultNode;
    }


}
