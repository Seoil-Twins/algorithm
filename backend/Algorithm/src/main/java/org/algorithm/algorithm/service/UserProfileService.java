package org.algorithm.algorithm.service;

import lombok.RequiredArgsConstructor;
import org.algorithm.algorithm.config.StorageProperties;
import org.algorithm.algorithm.entity.UserProfileEntity;
import org.algorithm.algorithm.exception.StorageException;
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
public class UserProfileService {

    private final Path rootLocation;
    private final UserProfileRepository userProfileRepository; // 먼저 jpa, mysql dependency 추가

    @Autowired
    public UserProfileService(StorageProperties properties, UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;

        if(properties.getLocation().trim().length() == 0){
            throw new StorageException("File upload location can not be Empty.");
        }

        this.rootLocation = Paths.get(properties.getLocation());
    }

    // default 저장은 images
    public void store(MultipartFile file) {
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

            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(newFilename))
                    .normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file outside current directory.");
            }
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
                System.out.println(file.getSize());
                System.out.println(file.getContentType());
                System.out.println(rootLocation);

            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }


    public void store(MultipartFile file, long userId, String additionalPath) {
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
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);
                System.out.println(file.getSize());
                System.out.println(file.getContentType());
                System.out.println(rootLocation);
                UserProfileEntity userProfileEntity = new UserProfileEntity();
                userProfileEntity.setUserId(userId);
                userProfileEntity.setType(file.getContentType());
                userProfileEntity.setSize(file.getSize());
                userProfileEntity.setPath( rootLocation.relativize(destinationFile) + "");
                userProfileRepository.save(userProfileEntity);

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
