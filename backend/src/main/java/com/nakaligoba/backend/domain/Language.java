package com.nakaligoba.backend.domain;

import java.util.Arrays;
import java.util.Optional;

public enum Language {
    PYTHON_3("python3", "python:3.8", "3.8"),
    ;

    private final String name;
    private final String imageName;
    private final String tag;

    Language(String name, String imageName, String tag) {
        this.name = name;
        this.imageName = imageName;
        this.tag = tag;
    }

    public String getName() {
        return name;
    }

    public String getImageName() {
        return imageName;
    }

    public String getTag() {
        return tag;
    }

    public static Optional<Language> findByName(String name) {
        return Arrays.stream(Language.values())
                .filter(l -> l.name.equals(name))
                .findAny();
    }
}
