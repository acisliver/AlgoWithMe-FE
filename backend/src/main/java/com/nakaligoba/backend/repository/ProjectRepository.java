package com.nakaligoba.backend.repository;

import com.nakaligoba.backend.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {
    boolean existsBytName(String name);
}
