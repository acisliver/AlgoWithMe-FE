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

    // Todo storage_key 추가
    @Column(name = "storage_key", nullable = false)
    private String storageKey;

    @Builder
    public ProjectEntity(String name, String description, String storageKey) {
        this.name = name;
        this.description = description;
        this.storageKey = storageKey;
    }
}
