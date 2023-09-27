package com.nakaligoba.backend.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Table(name = "files")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class FileEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    // Todo storageFileId 필드 추가
    @Column(name = "storage_file_id", nullable = false)
    private String storageFileId;

    @Column(name = "ext", nullable = false)
    private String ext;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    // Todo projectEntity 컬럼 추가
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private ProjectEntity project;

    @Builder
    public FileEntity(String name, String storageFileId, String ext, String content, ProjectEntity project) {
        this.name = name;
        this.storageFileId = storageFileId;
        this.ext = ext;
        this.content = content;
        this.project = project;
    }

    public void changeName(String newName) {
        this.name = newName;
    }
    public void changeExt(String newExt) {
        this.ext = newExt;
    }
    public void changeContent(String newContent) {
        this.content = newContent;
    }
    public void changeStorageFileId(String storageFileId) {
        this.storageFileId = storageFileId;
    }
}
