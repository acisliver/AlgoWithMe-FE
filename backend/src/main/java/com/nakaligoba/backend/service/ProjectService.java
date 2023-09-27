package com.nakaligoba.backend.service;

import com.nakaligoba.backend.entity.ProjectEntity;
import com.nakaligoba.backend.repository.ProjectRepository;
import com.nakaligoba.backend.controller.ProjectController.*;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Transactional
    public ProjectCreateResponse create(ProjectCreateRequest request) {
        if (projectRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("프로젝트명이 중복되었습니다.");
        }

        // Todo. template, storageId 추후 수정 필요
        String template = "python";

        ProjectEntity createdProject = ProjectEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .storageKey("storage_" + System.currentTimeMillis())
                .build();

        createdProject = projectRepository.save(createdProject);

        return ProjectCreateResponse.builder()
                .id(createdProject.getId())
                .storageId(createdProject.getStorageKey())
                .build();
    }

    @Transactional
    public List<ProjectListResponse> getAllProjects() {
        List<ProjectEntity> entities = projectRepository.findAll();
        return entities.stream()
                .map(entity -> ProjectListResponse.builder()
                        .name(entity.getName())
                        .description(entity.getDescription())
                        .updatedAt(entity.getUpdatedAt())
                        // Todo 협업자 관련 데이터 추후 수정필요
                        .collaborators(Arrays.asList(
                                CollaboratorResponse.builder().id(1L).name("사용자1").build(),
                                CollaboratorResponse.builder().id(2L).name("사용자2").build()
                        ))
                        .build())
                .collect(Collectors.toList());
    }
}
