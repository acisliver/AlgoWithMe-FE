package com.nakaligoba.backend.service;

import com.nakaligoba.backend.entity.FileEntity;
import com.nakaligoba.backend.entity.ProjectEntity;
import com.nakaligoba.backend.repository.FileRepository;
import com.nakaligoba.backend.repository.ProjectRepository;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FileService {

    private final FileRepository fileRepository;
    private final ProjectRepository projectRepository;

    @Transactional
    public FileDto createFile(FileDto fileDto, Long projectId) {
        if (fileRepository.existsByName(fileDto.fileName)) {
            throw new IllegalArgumentException("파일이름이 중복되었습니다.");
        }

        ProjectEntity projectEntity = projectRepository.findById(projectId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 프로젝트를 찾을 수 없습니다."));

        String storageFileId = fileDto.storageFileId;

        FileEntity createdFile = FileEntity.builder()
                .name(fileDto.fileName)
                .ext(fileDto.ext)
                .storageFileId("storage_File_Id_" + UUID.randomUUID().toString())
                .project(projectEntity)
                .build();

        createdFile = fileRepository.save(createdFile);

        return FileDto.builder()
                .fileId(createdFile.getId())
                .fileName(createdFile.getName())
                .ext(createdFile.getExt())
                .storageFileId(createdFile.getStorageFileId())
                .build();
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
        private String storageFileId;
    }
}
