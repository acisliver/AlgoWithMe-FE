package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.ProjectService;
import com.nakaligoba.backend.service.ProjectService.CreateProjectDto;
import com.nakaligoba.backend.service.ProjectService.UpdateProjectDto;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
