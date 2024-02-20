package org.algorithm.algorithm.service;

import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.config.StorageProperties;
import org.algorithm.algorithm.entity.BoardImageEntity;
import org.algorithm.algorithm.entity.UserProfileEntity;
import org.algorithm.algorithm.exception.NotFoundException;
import org.algorithm.algorithm.exception.StorageException;
import org.algorithm.algorithm.repository.BoardImageRepository;
import org.algorithm.algorithm.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class FileService {

    private final Path rootLocation;
    private final UserProfileRepository userProfileRepository; // 먼저 jpa, mysql dependency 추가
    private final BoardImageRepository boardImageRepository;

    @Autowired
    public FileService(StorageProperties properties, UserProfileRepository userProfileRepository, BoardImageRepository boardImageRepository) {
        this.userProfileRepository = userProfileRepository;
        this.boardImageRepository = boardImageRepository;

        if(properties.getLocation().trim().length() == 0){
            throw new StorageException("File upload location can not be Empty.");
        }

        this.rootLocation = Paths.get(properties.getLocation());
    }

    public String store(MultipartFile file, long userId, String additionalPath) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }

            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
            String formattedDateTime = now.format(formatter);


            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String fileExtension = StringUtils.getFilenameExtension(originalFilename);

            // 파일 이름 생성 (형식: 20240202185358)
            String newFilename = formattedDateTime + "." + fileExtension;

            Path destinationDirectory = this.rootLocation.resolve(Paths.get(additionalPath));
            Path destinationFile = destinationDirectory.resolve(newFilename).normalize().toAbsolutePath();

            // 폴더가 없다면 폴더 생성
            if (!Files.exists(destinationDirectory)) {
                Files.createDirectories(destinationDirectory);
            }

            if (!destinationFile.getParent().equals(destinationDirectory)) {
                // This is a security check
                System.out.println(destinationFile.getParent());
                System.out.println(destinationDirectory);
                throw new StorageException(
                        "Cannot store file outside current directory.");
            }

            // 기존 파일 삭제
            UserProfileEntity existingEntity = userProfileRepository.findByUserId(userId);
            if (existingEntity != null) {
                Path existingFilePath = rootLocation.resolve(existingEntity.getPath());
                Files.deleteIfExists(existingFilePath);
                userProfileRepository.delete(existingEntity);
            }


            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
                UserProfileEntity userProfileEntity = new UserProfileEntity();
                userProfileEntity.setUserId(userId);
                userProfileEntity.setType(file.getContentType());
                userProfileEntity.setSize(file.getSize());
                userProfileEntity.setPath( rootLocation.relativize(destinationFile) + "");
                userProfileRepository.save(userProfileEntity);

            }
            return destinationDirectory.toString();
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    public String storeBoardImage(MultipartFile file, long boardId, String additionalPath) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }

            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
            String formattedDateTime = now.format(formatter);


            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String fileExtension = StringUtils.getFilenameExtension(originalFilename);

            // 파일 이름 생성 (형식: 20240202185358)
            String newFilename = formattedDateTime + "." + fileExtension;

            Path destinationDirectory = this.rootLocation.resolve(Paths.get(additionalPath));
            Path destinationFile = destinationDirectory.resolve(newFilename).normalize().toAbsolutePath();

            // 폴더가 없다면 폴더 생성
            if (!Files.exists(destinationDirectory)) {
                Files.createDirectories(destinationDirectory);
            }

            if (!destinationFile.getParent().equals(destinationDirectory)) {
                // This is a security check
                System.out.println(destinationFile.getParent());
                System.out.println(destinationDirectory);
                throw new StorageException(
                        "Cannot store file outside current directory.");
            }

            try (InputStream inputStream = file.getInputStream()) {
                System.out.println(destinationFile.getParent());
                System.out.println(destinationDirectory);
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
                BoardImageEntity boardImageEntity = new BoardImageEntity();
                boardImageEntity.setBoardId(boardId);
                boardImageEntity.setType(file.getContentType());
                boardImageEntity.setSize(file.getSize());
                boardImageEntity.setPath( rootLocation.relativize(destinationFile) + "");
                boardImageRepository.save(boardImageEntity);
            }

            return destinationDirectory.toString();
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }


    public void deleteBoardImage(long boardImageId) {
        try {

            // 기존 파일 삭제
            BoardImageEntity existingEntity = boardImageRepository.findByBoardImageId(boardImageId);
            if (existingEntity != null) {
                Path existingFilePath = rootLocation.resolve(existingEntity.getPath());
                Files.deleteIfExists(existingFilePath);
                boardImageRepository.delete(existingEntity);
            } else {
                throw new NotFoundException("Image Not Found");
            }


        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        }
        catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }
    }

    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }



}
