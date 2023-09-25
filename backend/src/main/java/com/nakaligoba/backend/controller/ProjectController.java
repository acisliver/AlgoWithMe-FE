package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.ProjectService;
import com.nakaligoba.backend.service.ProjectService.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;


    @PostMapping
    public ResponseEntity<ProjectCreateResponse> createProject(@Valid @RequestBody ProjectCreateRequest request) {
        ProjectCreateResponse response = projectService.create(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ProjectListResponse> getAllProjects() {
        List<ProjectListResponse> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
}
