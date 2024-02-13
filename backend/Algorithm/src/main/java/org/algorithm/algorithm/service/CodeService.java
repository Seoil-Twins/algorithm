package org.algorithm.algorithm.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.CodeDTO;
import org.algorithm.algorithm.dto.CommentCodeDTO;
import org.algorithm.algorithm.dto.ResponseUserDTO;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.entity.*;
import org.algorithm.algorithm.exception.GlobalException;
import org.algorithm.algorithm.exception.NotFoundException;
import org.algorithm.algorithm.exception.SQLException;
import org.algorithm.algorithm.repository.*;
import org.algorithm.algorithm.util.CodeRunner;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class CodeService {

    public final CodeRepository codeRepository;
    public final CommentCodeRepository commentCodeRepository;
    public final UserProfileRepository userProfileRepository;
    public final AlgorithmRepository algorithmRepository;
    public final ResponseUserRepository responseUserRepository;
    public final TestcaseRepository testcaseRepository;
    public final GlotService glotService;
    public final UserTryRepository userTryRepository;

    public ObjectNode getAllCode(int pageNo, int pageSize) {
        try {
            Pageable pageable = PageRequest.of(pageNo-1, pageSize);
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
            throw new SQLException("Failed to get code.");
        }
    }

    public ObjectNode getSpecificCode(Long codeId) {
        try {
            CodeEntity codeEntity = codeRepository.findCodeEntityByCodeId(codeId);

            if(codeEntity == null)
                throw new NotFoundException("Code Not Found By CodeId : " + codeId);

            CodeDTO codeDTO = CodeDTO.toCodeDTO(codeEntity);
            ObjectNode codeNode = createCodeNode(codeDTO);

            return codeNode;
        } catch (Exception e) {
            throw new SQLException("Failed to get code.");
        }
    }

    public ObjectNode getCodeByAlgorithmId(int pageNo, int pageSize,Long language, Long algorithmId) {

        if(algorithmRepository.findOneByAlgorithmId(algorithmId) == null)
            throw new NotFoundException("Algorithm Not Found By AlgorithmId : " + algorithmId);
        try {
            Pageable pageable = PageRequest.of(pageNo-1, pageSize);
            Page<CodeEntity> codeEntities = codeRepository.findCodeEntitiesByAlgorithmIdAndTypeAndSolved(pageable,algorithmId,language, true);

            List<CodeEntity> resultValue = codeEntities.getContent();
            List<ObjectNode> responseList = new ArrayList<>();

            for (CodeEntity codeEntity : resultValue) {
                CodeDTO codeDTO = CodeDTO.toCodeDTO(codeEntity);
                ObjectNode codeNode = createCodeNode(codeDTO);
                responseList.add(codeNode);
            }

            return createResultNode(responseList);
        } catch (Exception e) {
            throw new SQLException("Failed to get code.");
        }
    }

    public CodeDTO postCode(CodeDTO codeDTO, UserDTO userDTO) {
        try {
            System.out.println(codeDTO);
            CodeRunner codeRunner = new CodeRunner(testcaseRepository);
            Boolean codeResultSolved = false;

            double startTime = System.currentTimeMillis();
            switch (codeDTO.getType().toString()){
                case "3001" : codeResultSolved = codeRunner.runCpp(codeDTO); break;
                case "3002" : codeResultSolved = codeRunner.runPython(codeDTO); break;
                case "3003" : codeResultSolved = codeRunner.runJava(codeDTO); break;
                default: throw new GlobalException("Type이 잘못되었습니다,.");
            }
            double endTime = System.currentTimeMillis();

            double excuteTime = ( endTime - startTime )/ 1000.0;

            AlgorithmEntity algorithmEntity = algorithmRepository.findOneByAlgorithmId(codeDTO.getAlgorithmId());

            Boolean solved = codeResultSolved && (Double.parseDouble(algorithmEntity.getLimitTime()) > excuteTime);

            System.out.println(Double.parseDouble(algorithmEntity.getLimitTime()));
            System.out.println(excuteTime);
            System.out.println(solved);

            CodeDTO postCodeDTO = new CodeDTO();
            postCodeDTO.setUserId(userDTO.getUserId());
            postCodeDTO.setAlgorithmId(codeDTO.getAlgorithmId());
            postCodeDTO.setCode(codeDTO.getCode());
            postCodeDTO.setType(codeDTO.getType());
            postCodeDTO.setSolved(solved);
            postCodeDTO.setCreatedTime(LocalDateTime.now());

            CodeEntity savedEntity = codeRepository.save(CodeEntity.toCodeEntity(postCodeDTO));

            UserTryEntity userTryEntity = new UserTryEntity();
            userTryEntity.setUserId(userDTO.getUserId());
            userTryEntity.setAlgorithmId(codeDTO.getAlgorithmId());
            userTryEntity.setSolved(solved);
            userTryEntity.setCodeId(savedEntity.getCodeId());
            userTryEntity.setTryMem("128");
            userTryEntity.setTryTime(String.valueOf(excuteTime));
            userTryEntity.setCreatedTime(LocalDateTime.now());

            userTryRepository.save(userTryEntity);
            return CodeDTO.toCodeDTO(savedEntity);
        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to post code.");
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to get code.", e);
        }
    }

    public HttpStatus postCommentCode(CommentCodeDTO commentCodeDTO,Long codeId, UserDTO userDTO) {
        try {
            CodeEntity targetCodeEntity = codeRepository.findCodeEntityByCodeId(codeId);

            if(targetCodeEntity == null)
                throw new NotFoundException("Not Found Code. code_id : " + codeId);

            commentCodeDTO.setUserId(userDTO.getUserId());
            commentCodeDTO.setCodeId(codeId);
            commentCodeDTO.setCreatedTime(LocalDateTime.now());

            commentCodeRepository.save(CommentCodeEntity.toCommentCodeEntity(commentCodeDTO));

            return HttpStatus.CREATED;

        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to post comment_code.");
        }
    }

    public HttpStatus patchCommentCode(CommentCodeDTO commentCodeDTO, Long commentCodeId, UserDTO userDTO) {
        try {
            // 댓글 엔티티 검색
            CommentCodeEntity commentEntity = commentCodeRepository.findById(commentCodeId).orElse(null);

            // 해당 댓글이 없으면 NotFoundException 발생
            if (commentEntity == null)
                throw new NotFoundException("Not Found Comment. comment_id : " + commentCodeId);

            // 유저 확인 (옵션: 댓글 작성자와 현재 유저가 같은지 확인)
            if (!commentEntity.getUserId().equals(userDTO.getUserId()))
                throw new BadRequestException("User not authorized to edit this comment.");

            // content만 업데이트
            commentEntity.setContent(commentCodeDTO.getContent());

            // 업데이트된 댓글 저장
            commentCodeRepository.save(commentEntity);

            return HttpStatus.OK;

        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to patch comment_code.");
        }
    }

    public HttpStatus deleteCommentCode(Long commentCodeId, UserDTO userDTO) {
        try {
            // 댓글 엔티티 검색
            CommentCodeEntity commentEntity = commentCodeRepository.findById(commentCodeId).orElse(null);

            // 해당 댓글이 없으면 NotFoundException 발생
            if (commentEntity == null)
                throw new NotFoundException("Not Found Comment. comment_id : " + commentCodeId);

            // 유저 확인 (옵션: 댓글 작성자와 현재 유저가 같은지 확인)
            if (!commentEntity.getUserId().equals(userDTO.getUserId()))
                throw new BadRequestException("User not authorized to edit this comment.");

            // 댓글 삭제
            commentCodeRepository.delete(commentEntity);

            return HttpStatus.OK;

        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to delete comment_code.");
        }
    }

    private ObjectNode createCodeNode(CodeDTO codeDTO) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode codeNode = objectMapper.createObjectNode();

        // userId로 user data 가져와서 node 생성
        ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(codeDTO.getUserId());
        ResponseUserDTO responseUserDTO = ResponseUserDTO.toResponseUserDTO(userEntity);
        System.out.println(responseUserDTO.getUserId());

        UserProfileEntity userProfileEntity = userProfileRepository.findUserProfileEntityByUserId(responseUserDTO.getUserId());
        String profile;

        if (userProfileEntity == null) {
            profile = null;
        } else {
            profile = userProfileEntity.getPath();
        }

        CommentCodeEntity[] commentCodeEntities = commentCodeRepository.findByCodeId(codeDTO.getCodeId());
        ArrayNode commentsNode = objectMapper.createArrayNode();

        for(CommentCodeEntity commentCodeEntity : commentCodeEntities){
            ObjectNode commentNode = objectMapper.createObjectNode();

            UserProfileEntity commentUserProfileEntity = userProfileRepository.findUserProfileEntityByUserId(commentCodeEntity.getUserId());
            String commentUserProfile;

            if (commentUserProfileEntity == null) {
                commentUserProfile = null;
            } else {
                commentUserProfile = userProfileEntity.getPath();
            }

            commentNode.put("commentCodeId", commentCodeEntity.getCommentCodeId());
            commentNode.put("codeId", commentCodeEntity.getCodeId());
            commentNode.put("user",commentUserProfile);
            commentNode.put("content",commentCodeEntity.getContent());
            commentNode.put("createdTime", String.valueOf(commentCodeEntity.getCreatedTime()));

            commentsNode.add(commentNode);
        }

        ObjectNode commentResponse = objectMapper.createObjectNode();
        commentResponse.set("results", commentsNode);
        commentResponse.put("total", commentsNode.size());

        ObjectNode userNode = objectMapper.createObjectNode();
        userNode.put("userId", responseUserDTO.getUserId());
        userNode.put("profile", profile);
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
        codeNode.set("comments",commentResponse);
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
        resultNode.put("total", responseList.size());

        return resultNode;
    }


}
