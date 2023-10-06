package com.nakaligoba.backend.service;

import com.github.dockerjava.api.exception.UnauthorizedException;
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
import java.util.NoSuchElementException;
import java.util.Optional;
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
    public List<ProjectListResponse> getProjectsByEmail(String email) {
        MemberEntity member = memberRepository.findByEmail(email);
        List<MemberProjectEntity> memberProjects = memberProjectRepository.findByMember(member);

        return memberProjects.stream()
                .map(memberProject -> memberProjectToResponse(memberProject))
                .collect(Collectors.toList());
    }

    private ProjectListResponse memberProjectToResponse(MemberProjectEntity memberProject) {
        ProjectEntity project = memberProject.getProject();
        List<CollaboratorResponse> collaborators = getCollaborators(project);
        return ProjectListResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .updatedAt(project.getUpdatedAt())
                .collaborators(collaborators)
                .build();
    }

    private List<CollaboratorResponse> getCollaborators(ProjectEntity project) {
        return project.getCollaborators().stream()
                .map(mp -> CollaboratorResponse.builder()
                        .id(mp.getMember().getId())
                        .name(mp.getMember().getName())
                        .role(mp.getRole())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteProject(Long projectId, String email) {
        MemberEntity member = memberRepository.findByEmail(email);
        MemberProjectEntity memberProject = memberProjectRepository.findByMemberAndProjectId(member, projectId);

        if (memberProject == null) {
            throw new NoSuchElementException("프로젝트를 찾을 수 없습니다.");
        }
        if (memberProject.getRole() != Role.OWNER) {
            throw new UnauthorizedException("프로젝트 삭제 권한이 없습니다.");
        }

        projectRepository.deleteById(projectId);
    }

    @Transactional
    public void updateProject(UpdateProjectDto dto) {
        ProjectEntity project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(IllegalArgumentException::new);

        project.changeProjectName(dto.getName());
        project.changeDescription(dto.getDescription());
        projectRepository.save(project);
    }

    @Transactional
    public void inviteMemberToProject(Long projectId, String inviterEmail, String inviteeEmail) {
        MemberEntity inviter = validateInviteByEmail(inviterEmail);
        MemberEntity invitee = validateInviteByEmail(inviteeEmail);
        ProjectEntity project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다."));

        Optional<MemberProjectEntity> ownerRelationOpt = memberProjectRepository
                .findByProjectAndMemberAndRole(project, inviter, Role.OWNER);
        if (!ownerRelationOpt.isPresent()) {
            throw new IllegalArgumentException("권한이 없습니다.");
        }

        boolean isAlreadyMember = project.getCollaborators().stream()
                .anyMatch(mp -> mp.getMember().equals(invitee));
        if (isAlreadyMember) {
            throw new IllegalArgumentException("이미 초대된 사용자입니다.");
        }

        MemberProjectEntity newMemberProject = new MemberProjectEntity(project, invitee, Role.COLLABORATOR);
        memberProjectRepository.save(newMemberProject);
    }

    private MemberEntity validateInviteByEmail(String email) {
        MemberEntity member = memberRepository.findByEmail(email);
        if (member == null) {
            throw new IllegalArgumentException("입력 값을 잘못 입력하였습니다.");
        }
        return member;
    }

    @Data
    @Builder
    public static class CreateProjectDto {
        private final String name;
        private final String description;
        private final String email;
    }

    @Data
    @Builder
    public static class DeleteProjectDto {
        private final Long projectId;
        private final String userEmail;
    }

    @Data
    @Builder
    public static class UpdateProjectDto {
        private final Long projectId;
        private final String name;
        private final String description;
    }
}
