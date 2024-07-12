package com.college.algorithm.dto;

import com.college.algorithm.util.ValidFile;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class RequestProfileDto {
    @ValidFile(message = "프로필 사진은 필수입니다.")
    private final MultipartFile profile;

    @JsonCreator
    public RequestProfileDto(MultipartFile profile) {
        this.profile = profile;
    }
}
