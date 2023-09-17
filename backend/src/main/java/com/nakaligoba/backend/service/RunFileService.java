package com.nakaligoba.backend.service;

import com.nakaligoba.backend.domain.Language;
import com.nakaligoba.backend.entity.FileEntity;
import com.nakaligoba.backend.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class RunFileService {

    private final DockerTemplate dockerTemplate;
    private final FileRepository fileRepository;

    public String run(Long fileId, String languageName) {
        Language language = Language.findByName(languageName)
                .orElseThrow(() -> new IllegalArgumentException("Not supported language: " + languageName));

        FileEntity fileEntity = fileRepository.findById(fileId)
                .orElseThrow(NoSuchElementException::new);
        String code = fileEntity.getContent();

        return dockerTemplate.run(language, code);
    }

}
