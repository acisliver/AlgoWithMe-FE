package com.nakaligoba.backend.service;

import com.nakaligoba.backend.entity.FileEntity;
import com.nakaligoba.backend.entity.MemberEntity;
import com.nakaligoba.backend.entity.ProjectEntity;
import com.nakaligoba.backend.repository.FileRepository;
import com.nakaligoba.backend.repository.MemberRepository;
import com.nakaligoba.backend.repository.ProjectRepository;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.util.NoSuchElementException;

@Slf4j
@RequiredArgsConstructor
@Service
public class FileService {

    private final FileRepository fileRepository;
    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final S3Client s3Client;
    private final String BUCKET_NAME = "web-ide-projects";

    @Transactional
    public Long createFile(CreateFileDto dto) {
        ProjectEntity projectEntity = projectRepository.findById(dto.projectId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 프로젝트를 찾을 수 없습니다."));

        MemberEntity member = memberRepository.findByEmail(dto.userEmail);
        String memberId = String.valueOf(member.getId());
        String key = String.format("%s/%s/%s.%s", memberId, projectEntity.getName(), dto.fileName, dto.ext);

        if (fileRepository.existsByStorageFileId(key)) {
            throw new IllegalArgumentException("파일이름이 중복되었습니다.");
        }

        saveFileToS3(key);
        FileEntity fileEntity = saveFileToRepository(projectEntity, key);

        return fileEntity.getId();
    }

    private void saveFileToS3(String key) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(key)
                .build();
        s3Client.putObject(putObjectRequest, RequestBody.empty());
    }

    private FileEntity saveFileToRepository(ProjectEntity projectEntity, String key) {
        FileEntity createdFile = FileEntity.builder()
                .storageFileId(key)
                .project(projectEntity)
                .build();
        return fileRepository.save(createdFile);
    }

    @Transactional
    public FileDto updateFile(Long fileId, FileDto fileDto) {
        FileEntity fileEntity = fileRepository.findById(fileId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 파일을 찾을 수 없습니다."));

        fileEntity.changeName(fileDto.getFileName());
        fileEntity.changeExt(fileDto.getExt());
        fileEntity.changeContent(fileDto.getContent());

        fileRepository.save(fileEntity);

        return FileDto.builder()
                .fileId(fileEntity.getId())
                .fileName(fileEntity.getName())
                .ext(fileEntity.getExt())
                .content(fileEntity.getContent())
                .build();
    }

    @Transactional
    public FileDto getFileById(Long id) {
        return fileRepository.findById(id)
                .map(file -> FileDto.builder()
                        .fileId(file.getId())
                        .fileName(file.getName())
                        .ext(file.getExt())
                        .content(file.getContent())
                        .build())
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 파일을 찾을 수 없습니다."));
    }

    public String runCode(Long id) {
        FileEntity file = fileRepository.findById(id).orElseThrow(()
                -> new NoSuchElementException("해당 ID의 파일을 찾을 수 없습니다."));
        String content = file.getContent();
        // ..

        return content;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FileDto {
        private Long fileId;
        private String fileName;
        private String ext;
        private String content;
    }

    @Data
    @Builder
    public static class CreateFileDto {
        private final String fileName;
        private final String ext;
        private final String userEmail;
        private final Long projectId;
    }
}
