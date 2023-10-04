package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.FileService;
import com.nakaligoba.backend.service.RunFileService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import com.nakaligoba.backend.service.FileService.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/projects/{projectId}/files")
public class FileController {

    private final FileService fileService;
    private final RunFileService dockerService;

    @GetMapping("/{id}")
    public ResponseEntity<FileDto> getFile(@PathVariable Long id) {
        FileDto fileDto = fileService.getFileById(id);
        return ResponseEntity.ok(fileDto);
    }

    @PostMapping
    public ResponseEntity<CreateFileResponse> saveFile(
            @PathVariable Long projectId,
            @Valid @RequestBody FileRequest request
    ) {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        String username = authentication.getName();
        CreateFileDto dto = CreateFileDto.builder()
                .fileName(request.getName())
                .ext(request.getExt())
                .userEmail("test@test.com")
                .projectId(projectId)
                .build();
        log.info("Logged in Member email: {}", dto.getUserEmail());

        Long fileId = fileService.createFile(dto);
        CreateFileResponse response = new CreateFileResponse(fileId);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FileDto> updateFile(@PathVariable Long id, @Valid @RequestBody FileRequest request) {
        FileDto fileDto = FileDto.builder()
                .fileName(request.getName())
                .ext(request.getExt())
                .content(request.getContent())
                .build();

        FileDto updatedFileDto = fileService.updateFile(id, fileDto);

        return ResponseEntity.ok(updatedFileDto);
    }

    @GetMapping("/{id}/run")
    public ResponseEntity<RunResponse> runFile(
            @PathVariable Long id,
            @RequestParam String language
    ) {
        String result = dockerService.run(id, language);
        RunResponse response = new RunResponse(result);
        return ResponseEntity.ok(response);
    }

    @Data
    static class FileRequest {
        @NotBlank
        private final String name;
        @NotBlank
        private final String ext;
        private final String storageFileId;
        private final String content;
    }

    @Data
    static class CreateFileResponse {
        private final Long id;
    }

    @Data
    static class RunResponse {
        private final String message;
    }
}
