package com.college.algorithm.controller;

import com.college.algorithm.service.BatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/batch")
@ResponseBody
public class BatchController {
    private final BatchService batchService;

    @PostMapping("/ranking")
    ResponseEntity<?> batchRanking(){
        return ResponseEntity.status(batchService.batchRanking()).build();
    }

    @PostMapping("/board")
    ResponseEntity<?> batchBoard(){
        return ResponseEntity.status(batchService.batchBoard()).build();
    }

    @PostMapping("/algorithm")
    ResponseEntity<?> batchAlgorithm(){
        return ResponseEntity.status(batchService.batchAlgorithm()).build();
    }
}
