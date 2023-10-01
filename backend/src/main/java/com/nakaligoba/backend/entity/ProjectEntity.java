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

    @Column(name = "storage_id", nullable = false)
    private String storageId;

    @Builder
    public ProjectEntity(String name, String description, String storageId) {
        this.name = name;
        this.description = description;
        this.storageId = storageId;
    }
}
