package com.college.algorithm.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UploadFile {
    private String originalFilename;
    private String storeFilename;
    private String storePath;
    private String extension;
    private String type;
    private long size;

    @Builder
    public UploadFile(String originalFilename, String storeFilename, String storePath, String extension, String type, long size) {
        this.originalFilename = originalFilename;
        this.storeFilename = storeFilename;
        this.storePath = storePath;
        this.extension = extension;
        this.type = type;
        this.size = size;
    }
}
