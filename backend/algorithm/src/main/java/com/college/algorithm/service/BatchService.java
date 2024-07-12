package com.college.algorithm.service;


import com.college.algorithm.entity.*;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import com.college.algorithm.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BatchService {

    private final BatchRepository batchRepository;
    private final UserRepository userRepository;
    private final RankingRepository rankingRepository;
    private final BoardSuggestRepository boardSuggestRepository;
    private final BoardRepository boardRepository;
    private final AlgorithmRepository algorithmRepository;
    private final AlgorithmSuggestRepository algorithmSuggestRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public HttpStatus batchRanking(){

        List<Object[]> rankings = batchRepository.findRankings();

        // 기존 랭킹 테이블 비우기
        rankingRepository.deleteAll();

        // 새로운 랭킹 데이터 삽입
        int rank = 1;
        for (Object[] ranking : rankings) {
            Long userId = ((Number) ranking[0]).longValue();
            Long solvedCount = ((Number) ranking[1]).longValue();


            AppUser user = userRepository.findByUserId(userId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

            Ranking newRanking = new Ranking();
            newRanking.setUser(user);
            newRanking.setSolveCount(solvedCount);

            rankingRepository.save(newRanking);
        }

        return HttpStatus.OK;
    }


    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public HttpStatus batchBoard(){

        List<Object[]> boards = batchRepository.findBoards();

        // 기존 랭킹 테이블 비우기
        boardSuggestRepository.deleteAll();

        // 새로운 랭킹 데이터 삽입
        for (Object[] board : boards) {
            Board boardEntity = boardRepository.findByBoardId(((Number) board[0]).longValue())
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));

            BoardSuggest newBoardSuggest = new BoardSuggest();
            newBoardSuggest.setBoard(boardEntity);

            boardSuggestRepository.save(newBoardSuggest);
        }

        return HttpStatus.OK;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public HttpStatus batchAlgorithm(){

        List<Object[]> algorithms = batchRepository.findAlgorithm();

        // 기존 랭킹 테이블 비우기
        algorithmSuggestRepository.deleteAll();

        // 새로운 랭킹 데이터 삽입
        for (Object[] algorithm : algorithms) {
            Algorithm algorithmEntity = algorithmRepository.findAlgorithmByAlgorithmId(((Number) algorithm[0]).longValue());
            if(algorithmEntity == null){
                throw new CustomException(ErrorCode.NOT_FOUND_ALGORITHM);
            }

            AlgorithmSuggest newAlgorithmSuggest = new AlgorithmSuggest();
            newAlgorithmSuggest.setAlgorithm(algorithmEntity);

            algorithmSuggestRepository.save(newAlgorithmSuggest);
        }

        return HttpStatus.OK;
    }
}
