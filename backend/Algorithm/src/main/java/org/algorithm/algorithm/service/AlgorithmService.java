package org.algorithm.algorithm.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.*;
import org.algorithm.algorithm.entity.*;
import org.algorithm.algorithm.exception.GlobalException;
import org.algorithm.algorithm.exception.NotFoundException;
import org.algorithm.algorithm.exception.SQLException;
import org.algorithm.algorithm.repository.*;
import org.algorithm.algorithm.util.AlgorithmSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlgorithmService {

    public final AlgorithmRepository algorithmRepository;
    public final AlgorithmKindRepository algorithmKindRepository;
    public final ExplanationRepository explanationRepository;
    public final ResponseUserRepository responseUserRepository;
    public final UserRepository userRepository;
    public final UserProfileRepository userProfileRepository;
    public final TestcaseRepository testcaseRepository;
    public final FavoriteRepository favoriteRepository;


    public ObjectNode getAll(AlgorithmRequestDTO algorithmRequestDTO, UserDTO userDTO) {
        try {
            System.out.println(algorithmRequestDTO);
            Pageable pageable = PageRequest.of(algorithmRequestDTO.getPage()-1, algorithmRequestDTO.getCount());
            Page<AlgorithmEntity> algorithmEntities = algorithmRepository.findAll(pageable);


            ObjectMapper objectMapper = new ObjectMapper();

            List<AlgorithmEntity> resultValue = algorithmEntities.getContent();
            ArrayNode response = objectMapper.createArrayNode();



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
                TestcaseEntity[] testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmId(algorithmDTO.getAlgorithmId());
                ArrayNode testcaseArrayNode = objectMapper.createArrayNode();
                if (testcaseEntities == null)
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
                for (TestcaseEntity testcaseEntitiy : testcaseEntities) {
                    TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntitiy);


                    ObjectNode testcaseNode = objectMapper.createObjectNode();
                    testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
                    testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
                    testcaseNode.put("input", testcaseDTO.getInput());
                    testcaseNode.put("output", testcaseDTO.getOutput());
                    testcaseArrayNode.add(testcaseNode);
                }

                FavoriteEntity favoriteEntity = new FavoriteEntity();
                favoriteEntity.setUserId(userDTO.getUserId());
                favoriteEntity.setTargetId(algorithmDTO.getAlgorithmId());

                Boolean isFavorite = favoriteRepository.findCountByUserIdANDAlgorithmId(favoriteEntity) > 0;
                Boolean solved = algorithmRepository.findSolvedByAlgorithmIdANDUserId(algorithmDTO.getAlgorithmId(),userDTO.getUserId()) > 0;

                float tried = algorithmRepository.findTriedByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correct = algorithmRepository.findCorrectByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correctRate = 0.0f;
                if(tried > 0)
                    correctRate = correct / tried;

                ObjectNode dtoNode = objectMapper.createObjectNode();

                dtoNode.put("algorithmId",algorithmDTO.getAlgorithmId());
                dtoNode.put("user",linkNode);
                dtoNode.put("title",algorithmDTO.getTitle());
                dtoNode.put("level",algorithmDTO.getLevel());
                dtoNode.put("kinds",algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
                dtoNode.put("limitTime",algorithmDTO.getLimitTime());
                dtoNode.put("limitMem",algorithmDTO.getLimitMem());
                dtoNode.put("createdTime", String.valueOf(algorithmDTO.getCreatedTime()));
                dtoNode.put("content",algorithmDTO.getContent());
                dtoNode.put("isFavorite",isFavorite);
                dtoNode.put("testcase",testcaseArrayNode);
                dtoNode.put("solved",solved);
                dtoNode.put("correctRate",Math.round(correctRate*100));

                response.add(dtoNode);
            }
            ObjectNode responseJSON = objectMapper.createObjectNode();
            responseJSON.set("algorithms", response);
            responseJSON.put("total",algorithmEntities.getTotalElements());

            return responseJSON;
        }
        catch (Error e){
            throw new SQLException(" Algorithm Get All SQL Error ! ");
        }
    }

    public ObjectNode getAll(AlgorithmRequestDTO algorithmRequestDTO) {
        try {
            System.out.println(algorithmRequestDTO);
            Pageable pageable = PageRequest.of(algorithmRequestDTO.getPage()-1, algorithmRequestDTO.getCount());
            Page<AlgorithmEntity> algorithmEntities = algorithmRepository.findAll(
                    AlgorithmSpecification.withDynamicQuery(
                            algorithmRequestDTO.getSolved(),
                            algorithmRequestDTO.getSort(),
                            algorithmRequestDTO.getLevel(),
                            algorithmRequestDTO.getKind(),
                            algorithmRequestDTO.getRate(),
                            algorithmRequestDTO.getTag(),
                            algorithmRequestDTO.getKeyword()),
                    pageable
            );


            ObjectMapper objectMapper = new ObjectMapper();

            List<AlgorithmEntity> resultValue = algorithmEntities.getContent();
            ArrayNode response = objectMapper.createArrayNode();



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
                TestcaseEntity[] testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmId(algorithmDTO.getAlgorithmId());
                ArrayNode testcaseArrayNode = objectMapper.createArrayNode();
                if (testcaseEntities == null)
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
                for (TestcaseEntity testcaseEntitiy : testcaseEntities) {
                    TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntitiy);


                    ObjectNode testcaseNode = objectMapper.createObjectNode();
                    testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
                    testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
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
                dtoNode.put("user",linkNode);
                dtoNode.put("title",algorithmDTO.getTitle());
                dtoNode.put("level",algorithmDTO.getLevel());
                dtoNode.put("kinds",algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
                dtoNode.put("limitTime",algorithmDTO.getLimitTime());
                dtoNode.put("limitMem",algorithmDTO.getLimitMem());
                dtoNode.put("createdTime", String.valueOf(algorithmDTO.getCreatedTime()));
                dtoNode.put("content",algorithmDTO.getContent());
                dtoNode.put("testcase",testcaseArrayNode);
                dtoNode.put("correctRate",Math.round(correctRate*100));

                response.add(dtoNode);
            }
            ObjectNode responseJSON = objectMapper.createObjectNode();
            responseJSON.set("algorithms", response);
            responseJSON.put("total",algorithmEntities.getTotalElements());

            return responseJSON;
        }
        catch (Error e){
            throw new SQLException(" Algorithm Get All SQL Error ! ");
        }
    }

    public ObjectNode getRecommend(UserDTO userDTO) {
        try {
            List<AlgorithmEntity> algorithmEntities = algorithmRepository.findRecommend();
            if (algorithmEntities == null)
                throw new NotFoundException("NOT FOUND RECOMMEND ALGORITHM ( Maybe. Empty 'user_try' table )");


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode response = objectMapper.createArrayNode();




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
                TestcaseEntity[] testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmId(algorithmDTO.getAlgorithmId());
                ArrayNode testcaseArrayNode = objectMapper.createArrayNode();
                if (testcaseEntities == null)
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
                for (TestcaseEntity testcaseEntitiy : testcaseEntities) {
                    TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntitiy);


                    ObjectNode testcaseNode = objectMapper.createObjectNode();
                    testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
                    testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
                    testcaseNode.put("input", testcaseDTO.getInput());
                    testcaseNode.put("output", testcaseDTO.getOutput());
                    testcaseArrayNode.add(testcaseNode);
                }

                FavoriteEntity favoriteEntity = new FavoriteEntity();
                favoriteEntity.setUserId(userDTO.getUserId());
                favoriteEntity.setTargetId(algorithmDTO.getAlgorithmId());

                Boolean isFavorite = favoriteRepository.findCountByUserIdANDAlgorithmId(favoriteEntity) > 0;
                Boolean solved = algorithmRepository.findSolvedByAlgorithmIdANDUserId(algorithmDTO.getAlgorithmId(),userDTO.getUserId()) > 0;

                String[] images = algorithmRepository.findImagePathByAlgorithmId(algorithmDTO.getAlgorithmId());
                String thumnnail = null;
                if(images.length > 0)
                    thumnnail = images[0];

                float tried = algorithmRepository.findTriedByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correct = algorithmRepository.findCorrectByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correctRate = 0.0f;
                if(tried > 0)
                    correctRate = correct / tried;

                ObjectNode dtoNode = objectMapper.createObjectNode();

                dtoNode.put("algorithmId",algorithmDTO.getAlgorithmId());
                dtoNode.put("user",linkNode);
                dtoNode.put("title",algorithmDTO.getTitle());
                dtoNode.put("level",algorithmDTO.getLevel());
                dtoNode.put("kinds",algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
                dtoNode.put("limitTime",algorithmDTO.getLimitTime());
                dtoNode.put("limitMem",algorithmDTO.getLimitMem());
                dtoNode.put("createdTime", String.valueOf(algorithmDTO.getCreatedTime()));
                dtoNode.put("content",algorithmDTO.getContent());
                dtoNode.put("isFavorite",isFavorite);
                dtoNode.put("thumbnail",thumnnail);
                dtoNode.put("testcase",testcaseArrayNode);
                dtoNode.put("solved",solved);
                dtoNode.put("correctRate",Math.round(correctRate*100));

                System.out.println(responseAlgorithmDTO);
                response.add(dtoNode);
            }
            ObjectNode responseJSON = objectMapper.createObjectNode();
            responseJSON.set("algorithms", response);

            return responseJSON;
        }
        catch(Error e){
            throw new SQLException(" Algorithm Recommend get SQL Error");
        }
    }
    public ObjectNode getRecommend() {
        try {
            List<AlgorithmEntity> algorithmEntities = algorithmRepository.findRecommend();


            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode response = objectMapper.createArrayNode();




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
                TestcaseEntity[] testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmId(algorithmDTO.getAlgorithmId());
                ArrayNode testcaseArrayNode = objectMapper.createArrayNode();
                if (testcaseEntities == null)
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
                for (TestcaseEntity testcaseEntitiy : testcaseEntities) {
                    TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntitiy);


                    ObjectNode testcaseNode = objectMapper.createObjectNode();
                    testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
                    testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
                    testcaseNode.put("input", testcaseDTO.getInput());
                    testcaseNode.put("output", testcaseDTO.getOutput());
                    testcaseArrayNode.add(testcaseNode);
                }

                String[] images = algorithmRepository.findImagePathByAlgorithmId(algorithmDTO.getAlgorithmId());
                String thumnnail = null;
                if(images.length > 0)
                    thumnnail = images[0];

                float tried = algorithmRepository.findTriedByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correct = algorithmRepository.findCorrectByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correctRate = 0.0f;
                if(tried > 0)
                    correctRate = correct / tried;

                ObjectNode dtoNode = objectMapper.createObjectNode();

                dtoNode.put("algorithmId",algorithmDTO.getAlgorithmId());
                dtoNode.put("user",linkNode);
                dtoNode.put("title",algorithmDTO.getTitle());
                dtoNode.put("level",algorithmDTO.getLevel());
                dtoNode.put("kinds",algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
                dtoNode.put("limitTime",algorithmDTO.getLimitTime());
                dtoNode.put("limitMem",algorithmDTO.getLimitMem());
                dtoNode.put("createdTime", String.valueOf(algorithmDTO.getCreatedTime()));
                dtoNode.put("content",algorithmDTO.getContent());
                dtoNode.put("thumbnail",thumnnail);
                dtoNode.put("testcase",testcaseArrayNode);
                dtoNode.put("correctRate",Math.round(correctRate*100));

                System.out.println(responseAlgorithmDTO);
                response.add(dtoNode);
            }
            ObjectNode responseJSON = objectMapper.createObjectNode();
            responseJSON.set("algorithms", response);

            return responseJSON;
        }
        catch(Error e){
            throw new SQLException(" Algorithm Recommend get SQL Error");
        }
    }

    public ObjectNode getOneAlgorithm(long algorithmId, UserDTO userDTO) {
        try {
            AlgorithmEntity algorithmEntity = algorithmRepository.findOneByAlgorithmId(algorithmId);

            if (algorithmEntity == null)
                throw new NotFoundException("Algorithm Not Found");

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
            TestcaseEntity[] testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmId(algorithmDTO.getAlgorithmId());
            ArrayNode testcaseArrayNode = objectMapper.createArrayNode();
            if (testcaseEntities == null)
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
            for (TestcaseEntity testcaseEntitiy : testcaseEntities) {
                TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntitiy);


                ObjectNode testcaseNode = objectMapper.createObjectNode();
                testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
                testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
                testcaseNode.put("input", testcaseDTO.getInput());
                testcaseNode.put("output", testcaseDTO.getOutput());
                testcaseArrayNode.add(testcaseNode);
            }

            FavoriteEntity favoriteEntity = new FavoriteEntity();
            favoriteEntity.setUserId(userDTO.getUserId());
            favoriteEntity.setTargetId(algorithmDTO.getAlgorithmId());

            Boolean isFavorite = favoriteRepository.findCountByUserIdANDAlgorithmId(favoriteEntity) > 0;
            Boolean solved = algorithmRepository.findSolvedByAlgorithmIdANDUserId(algorithmDTO.getAlgorithmId(),userDTO.getUserId()) > 0;

            float tried = algorithmRepository.findTriedByAlgorithmId(algorithmDTO.getAlgorithmId());
            float correct = algorithmRepository.findCorrectByAlgorithmId(algorithmDTO.getAlgorithmId());
            float correctRate = 0.0f;
            if(tried > 0)
                correctRate = correct / tried;

            ObjectNode dtoNode = objectMapper.createObjectNode();

            dtoNode.put("algorithmId",algorithmDTO.getAlgorithmId());
            dtoNode.put("user",linkNode);
            dtoNode.put("title",algorithmDTO.getTitle());
            dtoNode.put("level",algorithmDTO.getLevel());
            dtoNode.put("kinds",algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
            dtoNode.put("limitTime",algorithmDTO.getLimitTime());
            dtoNode.put("limitMem",algorithmDTO.getLimitMem());
            dtoNode.put("createdTime", String.valueOf(algorithmDTO.getCreatedTime()));
            dtoNode.put("content",algorithmDTO.getContent());
            dtoNode.put("isFavorite",isFavorite);
            dtoNode.put("testcase",testcaseArrayNode);
            dtoNode.put("solved",solved);
            dtoNode.put("correctRate",Math.round(correctRate*100));


            return dtoNode;
        }
        catch(Error e){
            throw new SQLException("Algorithm Detail Get SQL Error");
        }
    }

    public ObjectNode getOneAlgorithm(long algorithmId) {
        try {
            AlgorithmEntity algorithmEntity = algorithmRepository.findOneByAlgorithmId(algorithmId);

            if (algorithmEntity == null)
                throw new NotFoundException("Algorithm Not Found");

            ObjectMapper objectMapper = new ObjectMapper();


            AlgorithmDTO algorithmDTO = AlgorithmDTO.toAlgorithmDTO(algorithmEntity);

            // userId로 user data 가져와서 node 생성
            ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(algorithmDTO.getUserId());
            ResponseUserDTO responseUserDTO = ResponseUserDTO.toResponseUserDTO(userEntity);

            ObjectNode linkNode = objectMapper.createObjectNode();
            linkNode.put("userId", responseUserDTO.getUserId());
            linkNode.put("profile", responseUserDTO.getProfile());
            linkNode.put("nickname", responseUserDTO.getNickname());

            // algorithmId로 testcase 찾아와서 node 생성
            TestcaseEntity[] testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmId(algorithmDTO.getAlgorithmId());
            ArrayNode testcaseArrayNode = objectMapper.createArrayNode();
            if (testcaseEntities == null)
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
            for (TestcaseEntity testcaseEntitiy : testcaseEntities) {
                TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntitiy);


                ObjectNode testcaseNode = objectMapper.createObjectNode();
                testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
                testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
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
            dtoNode.put("user",linkNode);
            dtoNode.put("title",algorithmDTO.getTitle());
            dtoNode.put("level",algorithmDTO.getLevel());
            dtoNode.put("kinds",algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
            dtoNode.put("limitTime",algorithmDTO.getLimitTime());
            dtoNode.put("limitMem",algorithmDTO.getLimitMem());
            dtoNode.put("createdTime", String.valueOf(algorithmDTO.getCreatedTime()));
            dtoNode.put("content",algorithmDTO.getContent());
            dtoNode.put("testcase",testcaseArrayNode);
            dtoNode.put("correctRate",Math.round(correctRate*100));


            return dtoNode;
        }
        catch(Error e){
            throw new SQLException("Algorithm Detail Get SQL Error");
        }
    }

    public ObjectNode getTriedAlgorithm(int page, int count, long userId, UserDTO userDTO) {
        if (userRepository.findByUserId(userId) == null)
            throw new NotFoundException("User Not Found");

        try {
            Pageable pageable = PageRequest.of(page-1, count);
            Page<AlgorithmEntity> algorithmEntities = algorithmRepository.findTriedByUserId(userId, pageable);
            List<AlgorithmEntity> findsEntities = algorithmEntities.getContent();

            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode response = objectMapper.createArrayNode();




            for (AlgorithmEntity algorithmEntity : findsEntities) {
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
                TestcaseEntity[] testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmId(algorithmDTO.getAlgorithmId());
                ArrayNode testcaseArrayNode = objectMapper.createArrayNode();
                if (testcaseEntities == null)
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
                for (TestcaseEntity testcaseEntitiy : testcaseEntities) {
                    TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntitiy);


                    ObjectNode testcaseNode = objectMapper.createObjectNode();
                    testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
                    testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
                    testcaseNode.put("input", testcaseDTO.getInput());
                    testcaseNode.put("output", testcaseDTO.getOutput());
                    testcaseArrayNode.add(testcaseNode);
                }

                FavoriteEntity favoriteEntity = new FavoriteEntity();
                favoriteEntity.setUserId(userDTO.getUserId());
                favoriteEntity.setTargetId(algorithmDTO.getAlgorithmId());

                Boolean isFavorite = favoriteRepository.findCountByUserIdANDAlgorithmId(favoriteEntity) > 0;
                Boolean solved = algorithmRepository.findSolvedByAlgorithmIdANDUserId(algorithmDTO.getAlgorithmId(),userDTO.getUserId()) > 0;

                float tried = algorithmRepository.findTriedByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correct = algorithmRepository.findCorrectByAlgorithmId(algorithmDTO.getAlgorithmId());
                float correctRate = 0.0f;
                if(tried > 0)
                    correctRate = correct / tried;

                ObjectNode dtoNode = objectMapper.createObjectNode();

                dtoNode.put("algorithmId",algorithmDTO.getAlgorithmId());
                dtoNode.put("user",linkNode);
                dtoNode.put("title",algorithmDTO.getTitle());
                dtoNode.put("level",algorithmDTO.getLevel());
                dtoNode.put("kinds",algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
                dtoNode.put("limitTime",algorithmDTO.getLimitTime());
                dtoNode.put("limitMem",algorithmDTO.getLimitMem());
                dtoNode.put("createdTime", String.valueOf(algorithmDTO.getCreatedTime()));
                dtoNode.put("content",algorithmDTO.getContent());
                dtoNode.put("isFavorite",isFavorite);
                dtoNode.put("testcase",testcaseArrayNode);
                dtoNode.put("solved",solved);
                dtoNode.put("correctRate",Math.round(correctRate*100));

                System.out.println(responseAlgorithmDTO);
                response.add(dtoNode);
            }
            ObjectNode responseJSON = objectMapper.createObjectNode();
            responseJSON.set("algorithms", response);
            responseJSON.put("total",algorithmEntities.getTotalElements());

            return responseJSON;
        }
        catch(Error e){
            throw new SQLException("tried Algorithm Get SQL Error");
        }
    }
    public ObjectNode getTriedAlgorithm(int page, int count, long userId) {
        if (userRepository.findByUserId(userId) == null)
            throw new NotFoundException("User Not Found");

        try {
            Pageable pageable = PageRequest.of(page-1, count);
            Page<AlgorithmEntity> algorithmEntities = algorithmRepository.findTriedByUserId(userId, pageable);
            List<AlgorithmEntity> findsEntities = algorithmEntities.getContent();

            ObjectMapper objectMapper = new ObjectMapper();
            ArrayNode response = objectMapper.createArrayNode();




            for (AlgorithmEntity algorithmEntity : findsEntities) {
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
                TestcaseEntity[] testcaseEntities = testcaseRepository.findTestcaseEntitiesByAlgorithmId(algorithmDTO.getAlgorithmId());
                ArrayNode testcaseArrayNode = objectMapper.createArrayNode();
                if (testcaseEntities == null)
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Data");
                for (TestcaseEntity testcaseEntitiy : testcaseEntities) {
                    TestcaseDTO testcaseDTO = TestcaseDTO.toTestcaseDTO(testcaseEntitiy);


                    ObjectNode testcaseNode = objectMapper.createObjectNode();
                    testcaseNode.put("testcaseId", testcaseDTO.getTestcaseId());
                    testcaseNode.put("algorithmId", testcaseDTO.getAlgorithmId());
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
                dtoNode.put("user",linkNode);
                dtoNode.put("title",algorithmDTO.getTitle());
                dtoNode.put("level",algorithmDTO.getLevel());
                dtoNode.put("kinds",algorithmRepository.findKindByKindId(algorithmDTO.getAlgorithmKind()));
                dtoNode.put("limitTime",algorithmDTO.getLimitTime());
                dtoNode.put("limitMem",algorithmDTO.getLimitMem());
                dtoNode.put("createdTime", String.valueOf(algorithmDTO.getCreatedTime()));
                dtoNode.put("content",algorithmDTO.getContent());
                dtoNode.put("testcase",testcaseArrayNode);
                dtoNode.put("correctRate",Math.round(correctRate*100));

                System.out.println(responseAlgorithmDTO);
                response.add(dtoNode);
            }
            ObjectNode responseJSON = objectMapper.createObjectNode();
            responseJSON.set("algorithms", response);
            responseJSON.put("total",algorithmEntities.getTotalElements());

            return responseJSON;
        }
        catch(Error e){
            throw new SQLException("tried Algorithm Get SQL Error");
        }
    }

    public ExplanationEntity getExplanation(long algorithmId) {
        try {
            ExplanationEntity result = explanationRepository.findByAlgorithmId(algorithmId);

            if (result == null)
                throw new NotFoundException("Explanation Not Found. AlgorithmId : " + algorithmId);

            return result;
        }
        catch(Error e){
            throw new SQLException("Explanation Get SQL Error");
        }
    }

    public List<AlgorithmKindEntity> getKinds() {
        try {
            List<AlgorithmKindEntity> result = algorithmKindRepository.findAll();

            List<ResponseAlgorithmDTO> response = new ArrayList<>();

            if (result == null)
                throw new NotFoundException("Kind Not Found. ");

            return result;
        }
        catch(Error e){
            throw new SQLException("Kinds Get SQL Error");
        }
    }
}
