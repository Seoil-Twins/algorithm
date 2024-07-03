package com.college.algorithm.controller;

import com.college.algorithm.dto.AlgorithmKindResponseDto;
import com.college.algorithm.dto.ResponseBoardTypeDto;
import com.college.algorithm.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ResponseBody
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/kind")
    public ResponseEntity<?> getKinds() {
        return ResponseEntity.status(HttpStatus.OK).body(boardService.getKinds());
    }
}
