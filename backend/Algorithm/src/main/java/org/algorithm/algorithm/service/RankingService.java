package org.algorithm.algorithm.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.config.StorageProperties;
import org.algorithm.algorithm.dto.BoardDTO;
import org.algorithm.algorithm.dto.ResponseUserDTO;
import org.algorithm.algorithm.dto.UserDTO;
import org.algorithm.algorithm.entity.*;
import org.algorithm.algorithm.exception.NotFoundException;
import org.algorithm.algorithm.exception.SQLException;
import org.algorithm.algorithm.exception.StorageException;
import org.algorithm.algorithm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class RankingService {

    public final RankingRepository rankingRepository;
    public final ResponseUserRepository responseUserRepository;
    public final UserProfileRepository userProfileRepository;
    public final UserTryRepository userTryRepository;

    public ObjectNode getRanking(int page, int count) {
        try {
            Pageable pageable = PageRequest.of(page-1, count);
            Page<RankingEntity> rankingEntities =  rankingRepository.findAll(pageable);


            // 랭킹을  찾지 못하면 오류 반환
            if (rankingEntities == null) {
                throw new NotFoundException("Ranking Not Found ! ");
            }

            List<RankingEntity> resultValue = rankingEntities.getContent();
            List<ObjectNode> responseList = new ArrayList<>();

            for (RankingEntity rankingEntity : resultValue) {
                ObjectNode rankingNode = createRankingNode(rankingEntity);
                responseList.add(rankingNode);
            }

            return createResultNode(responseList);

        }
        catch(NotFoundException e){
            throw e;
        }
        catch(Error e){
            throw new SQLException("Ranking SQL Error ! ");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private ObjectNode createRankingNode(RankingEntity rankingEntity) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode rankingNode = objectMapper.createObjectNode();

        // userId로 user data 가져와서 node 생성
        ResponseUserEntity userEntity = responseUserRepository.findDefaultByUserId(rankingEntity.getUserId());
        ResponseUserDTO responseUserDTO = ResponseUserDTO.toResponseUserDTO(userEntity);

        UserProfileEntity userProfileEntity = userProfileRepository.findUserProfileEntityByUserId(responseUserDTO.getUserId());
        String profile;

        if (userProfileEntity == null) {
            profile = null;
        } else {
            profile = userProfileEntity.getPath();
        }

        String tried = userTryRepository.findCountByUserId(rankingEntity.getUserId());

        ObjectNode userNode = objectMapper.createObjectNode();
        userNode.put("userId", responseUserDTO.getUserId());
        userNode.put("profile", profile);
        userNode.put("nickname", responseUserDTO.getNickname());




        rankingNode.put("rankingId", rankingEntity.getRankingId());
        rankingNode.set("user", userNode);
        rankingNode.put("tried", tried);
        rankingNode.put("solved", rankingEntity.getSolved());

        return rankingNode;
    }

    private ObjectNode createResultNode(List<ObjectNode> responseList) {
        ObjectMapper objectMapper = new ObjectMapper();
        ArrayNode codesArrayNode = objectMapper.createArrayNode();

        for (ObjectNode node : responseList) {
            codesArrayNode.add(node);
        }

        ObjectNode resultNode = objectMapper.createObjectNode();
        resultNode.set("rankings", codesArrayNode);
        resultNode.put("total", responseList.size());

        return resultNode;
    }
}