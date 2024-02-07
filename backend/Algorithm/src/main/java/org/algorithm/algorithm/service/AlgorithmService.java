package org.algorithm.algorithm.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.*;
import org.algorithm.algorithm.entity.*;
import org.algorithm.algorithm.repository.*;
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
public class AlgorithmService {

    public final AlgorithmRepository algorithmRepository;
    public final ExplanationRepository explanationRepository;
    public final ResponseUserRepository responseUserRepository;
    public final UserRepository userRepository;
    public final UserProfileRepository userProfileRepository;
    public final TestcaseRepository testcaseRepository;
    public final FavoriteRepository favoriteRepository;


    public List<ResponseAlgorithmDTO> getAll(int pageNo, int pageSize, UserDTO userDTO) {
        System.out.println(pageNo + "::" + pageSize);
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<AlgorithmEntity> algorithmEntities = algorithmRepository.findAll(pageable);


        List<AlgorithmEntity> resultValue = algorithmEntities.getContent();
        List<ResponseAlgorithmDTO> response = new ArrayList<>();


        ObjectMapper objectMapper = new ObjectMapper();


        for (AlgorithmEntity algorithmEntity : resultValue) {
            AlgorithmDTO algorithmDTO = AlgorithmDTO.toAlgorithmDTO(algorithmEntity);
            ResponseAlgorithmDTO responseAlgorithmDTO = new ResponseAlgorithmDTO();

            // userId로 user data 가져와서 node 생성
            ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(algorithmDTO.getUserId());
            ResponseUserDTO responseUserDTO = ResponseUserDTO.toResponseUserDTO(userEntity);

            ObjectNode linkNode = objectMapper.createObjectNode();
            linkNode.put("userId", responseUserDTO.getUserId());
            linkNode.put("profile", responseUserDTO.getProfile());
            linkNode.put("nickname", responseUserDTO.getNickname());

            // algorithmId로 testcase 찾아와서 node 생성
            TestcaseEntity testcaseEntity = testcaseRepository.findByAlgorithmId(algorithmDTO.getAlgorithmId());
            if(testcaseEntity == null)
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
            TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntity);


            ObjectNode testcaseNode = objectMapper.createObjectNode();
            testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
            testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
            testcaseNode.put("input", testcaseDTO.getInput());
            testcaseNode.put("output", testcaseDTO.getOutput());

            FavoriteEntity favoriteEntity = new FavoriteEntity();
            favoriteEntity.setUserId(userDTO.getUserId());
            favoriteEntity.setTargetId(algorithmDTO.getAlgorithmId());

            Boolean isFavorite = favoriteRepository.findCountByUserIdANDAlgorithmId(favoriteEntity) > 0;

            responseAlgorithmDTO.setAlgorithmId(algorithmDTO.getAlgorithmId());
            responseAlgorithmDTO.setUser(linkNode);
            responseAlgorithmDTO.setTitle(algorithmDTO.getTitle());
            responseAlgorithmDTO.setLevel(algorithmDTO.getLevel());
            responseAlgorithmDTO.setKinds(algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
            responseAlgorithmDTO.setAlgorithmCompe(algorithmDTO.getAlgorithmCompe());
            responseAlgorithmDTO.setContent(algorithmDTO.getContent());
            responseAlgorithmDTO.setLimitTime(algorithmDTO.getLimitTime());
            responseAlgorithmDTO.setLimitMem(algorithmDTO.getLimitMem());
            responseAlgorithmDTO.setTestcase(testcaseNode);
            responseAlgorithmDTO.setFavorite(isFavorite);
            responseAlgorithmDTO.setCreatedTime(algorithmDTO.getCreatedTime());

            System.out.println(responseAlgorithmDTO);
            response.add(responseAlgorithmDTO);
        }

        return response;
    }

    public List<ResponseAlgorithmDTO> getRecommend(UserDTO userDTO) {
        List<AlgorithmEntity> algorithmEntities = algorithmRepository.findRecommend();


        List<ResponseAlgorithmDTO> response = new ArrayList<>();


        ObjectMapper objectMapper = new ObjectMapper();


        for (AlgorithmEntity algorithmEntity : algorithmEntities) {
            AlgorithmDTO algorithmDTO = AlgorithmDTO.toAlgorithmDTO(algorithmEntity);
            ResponseAlgorithmDTO responseAlgorithmDTO = new ResponseAlgorithmDTO();

            // userId로 user data 가져와서 node 생성
            ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(algorithmDTO.getUserId());
            ResponseUserDTO responseUserDTO = ResponseUserDTO.toResponseUserDTO(userEntity);

            ObjectNode linkNode = objectMapper.createObjectNode();
            linkNode.put("userId", responseUserDTO.getUserId());
            linkNode.put("profile", responseUserDTO.getProfile());
            linkNode.put("nickname", responseUserDTO.getNickname());

            // algorithmId로 testcase 찾아와서 node 생성
            TestcaseEntity testcaseEntity = testcaseRepository.findByAlgorithmId(algorithmDTO.getAlgorithmId());
            if(testcaseEntity == null)
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
            TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntity);


            ObjectNode testcaseNode = objectMapper.createObjectNode();
            testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
            testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
            testcaseNode.put("input", testcaseDTO.getInput());
            testcaseNode.put("output", testcaseDTO.getOutput());

            FavoriteEntity favoriteEntity = new FavoriteEntity();
            favoriteEntity.setUserId(userDTO.getUserId());
            favoriteEntity.setTargetId(algorithmDTO.getAlgorithmId());

            Boolean isFavorite = favoriteRepository.findCountByUserIdANDAlgorithmId(favoriteEntity) > 0;

            responseAlgorithmDTO.setAlgorithmId(algorithmDTO.getAlgorithmId());
            responseAlgorithmDTO.setUser(linkNode);
            responseAlgorithmDTO.setTitle(algorithmDTO.getTitle());
            responseAlgorithmDTO.setLevel(algorithmDTO.getLevel());
            responseAlgorithmDTO.setKinds(algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
            responseAlgorithmDTO.setAlgorithmCompe(algorithmDTO.getAlgorithmCompe());
            responseAlgorithmDTO.setContent(algorithmDTO.getContent());
            responseAlgorithmDTO.setLimitTime(algorithmDTO.getLimitTime());
            responseAlgorithmDTO.setLimitMem(algorithmDTO.getLimitMem());
            responseAlgorithmDTO.setTestcase(testcaseNode);
            responseAlgorithmDTO.setFavorite(isFavorite);
            responseAlgorithmDTO.setCreatedTime(algorithmDTO.getCreatedTime());

            System.out.println(responseAlgorithmDTO);
            response.add(responseAlgorithmDTO);
        }

        return response;
    }

    public ResponseAlgorithmDTO getOneAlgorithm(long algorithmId, UserDTO userDTO) {
        AlgorithmEntity algorithmEntity = algorithmRepository.findOneByAlgorithmId(algorithmId);


        List<ResponseAlgorithmDTO> response = new ArrayList<>();


        ObjectMapper objectMapper = new ObjectMapper();


        AlgorithmDTO algorithmDTO = AlgorithmDTO.toAlgorithmDTO(algorithmEntity);
        ResponseAlgorithmDTO responseAlgorithmDTO = new ResponseAlgorithmDTO();

        // userId로 user data 가져와서 node 생성
        ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(algorithmDTO.getUserId());
        ResponseUserDTO responseUserDTO = ResponseUserDTO.toResponseUserDTO(userEntity);

        ObjectNode linkNode = objectMapper.createObjectNode();
        linkNode.put("userId", responseUserDTO.getUserId());
        linkNode.put("profile", responseUserDTO.getProfile());
        linkNode.put("nickname", responseUserDTO.getNickname());

        // algorithmId로 testcase 찾아와서 node 생성
        TestcaseEntity testcaseEntity = testcaseRepository.findByAlgorithmId(algorithmDTO.getAlgorithmId());
        if(testcaseEntity == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
        TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntity);


        ObjectNode testcaseNode = objectMapper.createObjectNode();
        testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
        testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
        testcaseNode.put("input", testcaseDTO.getInput());
        testcaseNode.put("output", testcaseDTO.getOutput());

        FavoriteEntity favoriteEntity = new FavoriteEntity();
        favoriteEntity.setUserId(userDTO.getUserId());
        favoriteEntity.setTargetId(algorithmDTO.getAlgorithmId());

        Boolean isFavorite = favoriteRepository.findCountByUserIdANDAlgorithmId(favoriteEntity) > 0;

        responseAlgorithmDTO.setAlgorithmId(algorithmDTO.getAlgorithmId());
        responseAlgorithmDTO.setUser(linkNode);
        responseAlgorithmDTO.setTitle(algorithmDTO.getTitle());
        responseAlgorithmDTO.setLevel(algorithmDTO.getLevel());
        responseAlgorithmDTO.setKinds(algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
        responseAlgorithmDTO.setAlgorithmCompe(algorithmDTO.getAlgorithmCompe());
        responseAlgorithmDTO.setContent(algorithmDTO.getContent());
        responseAlgorithmDTO.setLimitTime(algorithmDTO.getLimitTime());
        responseAlgorithmDTO.setLimitMem(algorithmDTO.getLimitMem());
        responseAlgorithmDTO.setTestcase(testcaseNode);
        responseAlgorithmDTO.setFavorite(isFavorite);
        responseAlgorithmDTO.setCreatedTime(algorithmDTO.getCreatedTime());

        return responseAlgorithmDTO;
    }

    public List<ResponseAlgorithmDTO> getTriedAlgorithm(long userId, UserDTO userDTO) {
        List<AlgorithmEntity> algorithmEntities = algorithmRepository.findTriedByUserId(userId);


        List<ResponseAlgorithmDTO> response = new ArrayList<>();


        ObjectMapper objectMapper = new ObjectMapper();


        for (AlgorithmEntity algorithmEntity : algorithmEntities) {
            AlgorithmDTO algorithmDTO = AlgorithmDTO.toAlgorithmDTO(algorithmEntity);
            ResponseAlgorithmDTO responseAlgorithmDTO = new ResponseAlgorithmDTO();

            // userId로 user data 가져와서 node 생성
            ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(algorithmDTO.getUserId());
            ResponseUserDTO responseUserDTO = ResponseUserDTO.toResponseUserDTO(userEntity);

            ObjectNode linkNode = objectMapper.createObjectNode();
            linkNode.put("userId", responseUserDTO.getUserId());
            linkNode.put("profile", responseUserDTO.getProfile());
            linkNode.put("nickname", responseUserDTO.getNickname());

            // algorithmId로 testcase 찾아와서 node 생성
            TestcaseEntity testcaseEntity = testcaseRepository.findByAlgorithmId(algorithmDTO.getAlgorithmId());
            if(testcaseEntity == null)
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
            TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntity);


            ObjectNode testcaseNode = objectMapper.createObjectNode();
            testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
            testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
            testcaseNode.put("input", testcaseDTO.getInput());
            testcaseNode.put("output", testcaseDTO.getOutput());

            FavoriteEntity favoriteEntity = new FavoriteEntity();
            favoriteEntity.setUserId(userDTO.getUserId());
            favoriteEntity.setTargetId(algorithmDTO.getAlgorithmId());

            Boolean isFavorite = favoriteRepository.findCountByUserIdANDAlgorithmId(favoriteEntity) > 0;

            responseAlgorithmDTO.setAlgorithmId(algorithmDTO.getAlgorithmId());
            responseAlgorithmDTO.setUser(linkNode);
            responseAlgorithmDTO.setTitle(algorithmDTO.getTitle());
            responseAlgorithmDTO.setLevel(algorithmDTO.getLevel());
            responseAlgorithmDTO.setKinds(algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
            responseAlgorithmDTO.setAlgorithmCompe(algorithmDTO.getAlgorithmCompe());
            responseAlgorithmDTO.setContent(algorithmDTO.getContent());
            responseAlgorithmDTO.setLimitTime(algorithmDTO.getLimitTime());
            responseAlgorithmDTO.setLimitMem(algorithmDTO.getLimitMem());
            responseAlgorithmDTO.setTestcase(testcaseNode);
            responseAlgorithmDTO.setFavorite(isFavorite);
            responseAlgorithmDTO.setCreatedTime(algorithmDTO.getCreatedTime());

            System.out.println(responseAlgorithmDTO);
            response.add(responseAlgorithmDTO);
        }

        return response;
    }

    public ExplanationEntity getExplanation(long algorithmId) {
        ExplanationEntity result = explanationRepository.findByAlgorithmId(algorithmId);
        return result;
    }
}
