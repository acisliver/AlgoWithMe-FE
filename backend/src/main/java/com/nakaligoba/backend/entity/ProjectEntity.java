package com.nakaligoba.backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "projects")
@NoArgsConstructor
@Getter
public class ProjectEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    // ToDo: S3 식별자 필요

    @Builder
    public ProjectEntity(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
