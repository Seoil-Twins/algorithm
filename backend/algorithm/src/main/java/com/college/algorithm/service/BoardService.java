package com.college.algorithm.service;

import com.college.algorithm.dto.AlgorithmKindDto;
import com.college.algorithm.dto.AlgorithmKindResponseDto;
import com.college.algorithm.dto.BoardTypeDto;
import com.college.algorithm.dto.ResponseBoardTypeDto;
import com.college.algorithm.entity.AlgorithmKind;
import com.college.algorithm.entity.BoardType;
import com.college.algorithm.repository.BoardTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardTypeRepository kindRepository;

    public ResponseBoardTypeDto getKinds(){

        List<BoardType> types = kindRepository.findAll();
        ResponseBoardTypeDto response = new ResponseBoardTypeDto();
        List<BoardTypeDto> dtos = new ArrayList<>();

        for(BoardType type : types){
            BoardTypeDto typeDto = new BoardTypeDto(Integer.parseInt(String.valueOf(type.getTypeId())),type.getTypeName());
            dtos.add(typeDto);
        }
        response.setTypes(dtos);

        return response;
    }
}
