package com.college.algorithm.util;

import com.college.algorithm.dto.UploadFile;
import com.college.algorithm.exception.CustomException;
import com.college.algorithm.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@Component
public class FileStore {
    @Value("${upload.dir}")
    private String directoryPath;

    public UploadFile storeFile(String storeDefaultPath, MultipartFile file) {
        if (file.isEmpty()) {
            log.warn("이미지가 비어 있습니다.\n파일 이름 : " + file.getOriginalFilename());
            throw new CustomException(ErrorCode.BROKEN_IMAGE);
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            log.warn("이미지가 이름이 존재하지 않습니다.\n파일 이름 : " + file.getOriginalFilename());
            throw new CustomException(ErrorCode.BROKEN_IMAGE);
        }

        String ext = extractExt(originalFilename);
        String storeFilename = createStoreFileName(ext);
        String type = file.getContentType();
        String storeFilePath = storeDefaultPath + storeFilename;
        String fullPath = getFullPath(storeDefaultPath + storeFilename);
        long size = file.getSize();

        try {
            file.transferTo(new File(fullPath));
        } catch (IOException e) {
            log.error("이미지 업로드에 실패하였습니다.\n이유 : " + e.getMessage());
            throw new CustomException(ErrorCode.ERROR_IMAGE_UPLOAD);
        }

        return UploadFile.builder()
                .originalFilename(originalFilename)
                .storeFilename(storeFilename)
                .storePath(storeFilePath)
                .extension(ext)
                .size(size)
                .type(type)
                .build();
    }

    private String getFullPath(String filePath) {
        return directoryPath + filePath;
    }

    public void deleteFile(String filePath) {
        String fullPath = getFullPath(filePath);

        File file = new File(fullPath);

        if (!file.exists()) {
            log.warn("파일이 존재하지 않습니다.\n경로 : " + fullPath);
            return;
        } else if (file.isDirectory()) {
            log.warn("디렉터리 삭제를 시도하였습니다.\n경로 : " + fullPath);
            return;
        }

        boolean isDeleted = file.delete();

        if (!isDeleted) {
            log.warn("파일 삭제에 실패하였습니다.\n경로 : " + fullPath);
        }
    }

    private String createStoreFileName(String ext) {
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }
}
