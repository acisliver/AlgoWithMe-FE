package com.nakaligoba.backend.service;

import com.nakaligoba.backend.entity.FileEntity;
import com.nakaligoba.backend.repository.FileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class RunFileServiceTest {

    @Autowired
    FileRepository fileRepository;

    @Autowired
    RunFileService runFileService;

    @Test
    void test() {
        FileEntity entity = FileEntity.builder()
                .name("test")
                .ext("py")
                .content("print('Hello, World!')")
                .build();
        fileRepository.save(entity);

        String result = runFileService.run(1L, "python3");

        assertThat(result).contains("Hello, World!");
    }
}
