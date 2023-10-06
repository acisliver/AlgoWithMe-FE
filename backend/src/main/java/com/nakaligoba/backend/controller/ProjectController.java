package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.ProjectService;
import com.nakaligoba.backend.service.ProjectService.CreateProjectDto;
import com.nakaligoba.backend.service.ProjectService.UpdateProjectDto;
import com.nakaligoba.backend.service.ReadProjectService;
import com.nakaligoba.backend.utils.JwtUtils;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final ReadProjectService readProjectService;
    private final JwtUtils jwtUtils;

    @PostMapping
    public ResponseEntity<ProjectCreateResponse> createProject(
            @Valid @RequestBody ProjectCreateRequest request
    ) {
        String email = "test@test.com";
        CreateProjectDto dto = CreateProjectDto.builder()
                .email(email)
                .name(request.name)
                .description(request.description)
                .build();
        ProjectCreateResponse response = projectService.create(dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProjectListResponse>> getAllProjects() {
        List<ProjectListResponse> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReadProjectDirectoryResponse> readProjectDirectory(@PathVariable Long id) {
        String email = jwtUtils.getEmailFromSpringSession();
        ReadProjectService.DirectoryDto dto = readProjectService.readProjectDirectory(id, email);
        String username = readProjectService.getUsername(email);
        List<ReadProjectService.Node> node = dto.getNodes();
        Long lastKey = dto.getLastKey();
        ReadProjectDirectoryResponse readProjectDirectoryResponse = new ReadProjectDirectoryResponse(node, lastKey, username);
        return ResponseEntity.ok(readProjectDirectoryResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProject(
            @PathVariable Long id,
            @RequestBody ProjectUpdateRequest request
    ) {
        UpdateProjectDto dto = UpdateProjectDto.builder()
                .projectId(id)
                .name(request.getName())
                .description(request.getDescription())
                .build();
        projectService.updateProject(dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        String email = "test@test.com";
        projectService.deleteProject(id, email);
        return ResponseEntity.ok().build();
    }

    @Data
    public static class ProjectCreateRequest {
        private String name;
        private String description;
        private String template;
    }

    @Data
    public static class ProjectUpdateRequest {
        private String name;
        private String description;
    }

    @Data
    @Builder
    public static class ProjectCreateResponse {
        private Long id;
    }

    @Data
    @Builder
    public static class ProjectListResponse {
        private Long id;
        private String name;
        private String description;
        private LocalDateTime updatedAt;
        private List<CollaboratorResponse> collaborators;
    }

    @Data
    @Builder
    public static class CollaboratorResponse {
        private Long id;
        private String name;
    }

    @Data
    public static class ReadProjectDirectoryResponse {
        private final List<ReadProjectService.Node> data;
        private final Long lastKey;
        private final String username;
    }
}
