package com.college.algorithm.controller;

import com.college.algorithm.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ranking")
@ResponseBody
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/")
    public ResponseEntity<?> getRankings(@RequestParam(required = false, defaultValue = "1", value = "page") int page,
                                       @RequestParam(required = false, defaultValue = "10", value = "count") int count){

        return ResponseEntity.status(HttpStatus.OK).body(rankingService.getRankings(page,count));
    }
}
