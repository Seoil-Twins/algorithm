package com.college.algorithm.service;

import com.college.algorithm.dto.RankingDto;
import com.college.algorithm.dto.ResponseOtherUserDto;
import com.college.algorithm.dto.ResponseRankingDto;
import com.college.algorithm.entity.AppUser;
import com.college.algorithm.entity.Ranking;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.mapper.UserMapper;
import com.college.algorithm.repository.RankingRepository;
import com.college.algorithm.repository.TryRepository;
import com.college.algorithm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingService {
    private final UserRepository userRepository;
    private final RankingRepository rankingRepository;
    private final TryRepository tryRepository;

    public ResponseRankingDto getRankings(int page, int count) {
        Pageable pageable = PageRequest.of(page-1,count);
        System.out.println("hi");
        Page<Ranking> rankings = rankingRepository.findAllByOrderBySolveCountDesc(pageable);

        ResponseRankingDto responseRankingDto = new ResponseRankingDto();

        List<RankingDto> rankingDtos = new ArrayList<>();
        for(Ranking ranking : rankings.getContent()){
            System.out.println(ranking.getRankingId());
            RankingDto rankingDto = new RankingDto();
            rankingDto.setUser(UserMapper.INSTANCE.toResponseRankingUserDto(ranking.getUser()));
            rankingDto.setSolved(ranking.getSolveCount());
            rankingDto.setTried(tryRepository.countByUser_UserId(ranking.getUser().getUserId()));
            rankingDtos.add(rankingDto);
        }

        long total = rankings.getTotalElements();

        responseRankingDto.setRankings(rankingDtos);
        responseRankingDto.setTotal(total);

        return responseRankingDto;
    }
}
