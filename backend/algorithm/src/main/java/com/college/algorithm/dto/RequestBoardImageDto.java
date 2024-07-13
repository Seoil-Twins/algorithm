package com.college.algorithm.dto;

import com.college.algorithm.validation.ValidFile;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class RequestBoardImageDto {
    @ValidFile(message = "사진은 필수입니다.")
    private final MultipartFile image;

    @JsonCreator
    public RequestBoardImageDto(MultipartFile image) {
        this.image = image;
    }
}
