package com.nakaligoba.backend.service;

import com.nakaligoba.backend.entity.MemberEntity;
import com.nakaligoba.backend.entity.MemberProjectEntity;
import com.nakaligoba.backend.entity.ProjectEntity;
import com.nakaligoba.backend.entity.Role;
import com.nakaligoba.backend.repository.MemberProjectRepository;
import com.nakaligoba.backend.repository.MemberRepository;
import com.nakaligoba.backend.repository.ProjectRepository;
import com.nakaligoba.backend.controller.ProjectController.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final MemberProjectRepository memberProjectRepository;

    @Transactional
    public ProjectCreateResponse create(CreateProjectDto dto) {
        MemberEntity member = memberRepository.findByEmail(dto.email);

        if (isDuplicatedName(member, dto.getName())) {
            throw new IllegalArgumentException("프로젝트명이 중복되었습니다.");
        }

        String key = String.format("%s/%s/", member.getId(), dto.name);
        ProjectEntity createdProject = ProjectEntity.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .storageId(key)
                .build();
        MemberProjectEntity memberProject = MemberProjectEntity.builder()
                .member(member)
                .project(createdProject)
                .role(Role.OWNER)
                .build();

        createdProject = projectRepository.save(createdProject);
        memberProjectRepository.save(memberProject);

        log.info("Project(id: {}, name: {}) is created", createdProject.getId(), createdProject.getName());
        return ProjectCreateResponse.builder()
                .id(createdProject.getId())
                .build();
    }

    private boolean isDuplicatedName(MemberEntity member, String name) {
        return member.getMemberProjects()
                .stream()
                .map(MemberProjectEntity::getProject)
                .map(ProjectEntity::getName)
                .anyMatch(n -> n.equals(name));
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

    @Data
    @Builder
    public static class CreateProjectDto {
        private final String name;
        private final String description;
        private final String email;
    }
}
