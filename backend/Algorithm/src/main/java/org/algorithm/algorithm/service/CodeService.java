package org.algorithm.algorithm.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.dto.*;
import org.algorithm.algorithm.entity.*;
import org.algorithm.algorithm.exception.*;
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
import java.util.Optional;
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
    public final RecommendCodeRepository recommendCodeRepository;
    public final RecommendCommentCodeRepository recommendCommentCodeRepository;

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
        }   catch ( NotFoundException e) {
            throw e;

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
        }  catch ( NotFoundException e) {
            throw e;

        }  catch (Exception e) {
            throw new SQLException("Failed to get code.");
        }
    }

    public ObjectNode postCode(CodeDTO codeDTO, UserDTO userDTO) {
        try {
            System.out.println(codeDTO);
            CodeRunner codeRunner = new CodeRunner(testcaseRepository);
            CodeResponseDTO codeResponseDTO = null;

            double startTime = System.currentTimeMillis();
            switch (codeDTO.getType().toString()){
                case "3001" : codeResponseDTO = codeRunner.runCpp(codeDTO); break;
                case "3002" : codeResponseDTO = codeRunner.runPython(codeDTO); break;
                case "3003" : codeResponseDTO = codeRunner.runJava(codeDTO); break;
                default: throw new GlobalException("Type이 잘못되었습니다,.");
            }
            double endTime = System.currentTimeMillis();

            double excuteTime = codeResponseDTO.getExcuteTime();
            Boolean codeResultSolved = codeResponseDTO.getSolved();
            System.out.println(codeResultSolved);

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

            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode response = objectMapper.createObjectNode();
            ObjectNode response2 = objectMapper.createObjectNode();
            response.set("code", CodeDTO.toCodeDTOJSON(savedEntity));
            response.set("results", codeResponseDTO.getResults());
            return response;
        }   catch (GlobalException | CompileException e) {
            throw e;

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

        }   catch ( NotFoundException e) {
            throw e;

        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to post comment_code.");
        }
    }

    public HttpStatus postRecommendCode(Long codeId, UserDTO userDTO, long value) {
        try {
            CodeEntity targetCodeEntity = codeRepository.findCodeEntityByCodeId(codeId);

            if(targetCodeEntity == null)
                throw new NotFoundException("Not Found Code. code_id : " + codeId);


            RecommendCodeEntity checkRecommendEntity = recommendCodeRepository.findByCodeIdAndUserId(codeId, userDTO.getUserId());

            if(checkRecommendEntity != null)
                throw new DuplicatedExcepiton("Already Exist Recommend");

            RecommendCodeEntity recommendCodeEntity = new RecommendCodeEntity();

            recommendCodeEntity.setUserId(userDTO.getUserId());
            recommendCodeEntity.setCodeId(codeId);
            recommendCodeEntity.setValue(value);

            recommendCodeRepository.save(recommendCodeEntity);

            return HttpStatus.CREATED;

        }  catch (DuplicatedExcepiton | NotFoundException e) {
            throw e;

        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to post recommend_code.");
        }
    }

    public HttpStatus postRecommendCommentCode(Long commentCodeId, UserDTO userDTO, long value) {
        try {
            CommentCodeEntity targetCodeEntity = commentCodeRepository.findCommentCodeEntityByCommentCodeId(commentCodeId);

            if(targetCodeEntity == null)
                throw new NotFoundException("Not Found CommentCode. comment_code_id : " + commentCodeId);


            RecommendCommentCodeEntity checkRecommendEntity = recommendCommentCodeRepository.findByCommentCodeIdAndUserId(commentCodeId, userDTO.getUserId());

            if(checkRecommendEntity != null)
                throw new DuplicatedExcepiton("Already Exist Recommend");

            RecommendCommentCodeEntity recommendCommentCodeEntity = new RecommendCommentCodeEntity();

            recommendCommentCodeEntity.setUserId(userDTO.getUserId());
            recommendCommentCodeEntity.setCommentCodeId(commentCodeId);
            recommendCommentCodeEntity.setValue(value);

            recommendCommentCodeRepository.save(recommendCommentCodeEntity);

            return HttpStatus.CREATED;

        }  catch (DuplicatedExcepiton e) {
            System.out.println(e);
            throw e;

        } catch (NotFoundException e) {
            System.out.println(e);
            throw e;

        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to post recommend_comment_code.");
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

    public HttpStatus deleteRecommendCode(Long codeId, UserDTO userDTO) {
        try {
            CodeEntity targetCodeEntity = codeRepository.findCodeEntityByCodeId(codeId);

            if(targetCodeEntity == null)
                throw new NotFoundException("Not Found Code. code_id : " + codeId);

            RecommendCodeEntity recommendCodeEntity = recommendCodeRepository.findByCodeIdAndUserId(codeId, userDTO.getUserId());

            if(recommendCodeEntity == null)
                throw new NotFoundException("Not Found Recommend. code_id : " + codeId);

            if(recommendCodeEntity.getUserId() != userDTO.getUserId())
                throw new AuthorizedException("Not Equals User_id");

            recommendCodeRepository.delete(recommendCodeEntity);

            return HttpStatus.OK;

        } catch (NotFoundException | AuthorizedException e) {
            System.out.println(e);
            throw e;
        }  catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to post comment_code.");
        }
    }

    public HttpStatus deleteRecommendCommentCode(Long commentCodeId, UserDTO userDTO) {
        try {
            CommentCodeEntity targetCodeEntity = commentCodeRepository.findByCommentCodeId(commentCodeId);

            if(targetCodeEntity == null)
                throw new NotFoundException("Not Found CommentCode. comment_code_id : " + commentCodeId);

            RecommendCommentCodeEntity recommendCommentCodeEntity = recommendCommentCodeRepository.findByCommentCodeIdAndUserId(commentCodeId, userDTO.getUserId());

            if(recommendCommentCodeEntity == null)
                throw new NotFoundException("Not Found Recommend. code_id : " + commentCodeId);

            if(recommendCommentCodeEntity.getUserId() != userDTO.getUserId())
                throw new AuthorizedException("Not Equals User_id");

            recommendCommentCodeRepository.delete(recommendCommentCodeEntity);

            return HttpStatus.OK;

        } catch (NotFoundException | AuthorizedException e) {
            System.out.println(e);
            throw e;
        } catch (Exception e) {
            System.out.println(e);
            throw new SQLException("Failed to post comment_code.");
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

            String recommend = commentCodeRepository.findRecommendByCommentCodeId(commentCodeEntity.getCommentCodeId());
            if ( recommend == null ) recommend = "0";
            commentNode.put("commentCodeId", commentCodeEntity.getCommentCodeId());
            commentNode.put("codeId", commentCodeEntity.getCodeId());
            commentNode.put("user",commentUserProfile);
            commentNode.put("content",commentCodeEntity.getContent());
            commentNode.put("recommend",recommend);
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
        if ( recommend == null ) recommend = "0";
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
