package com.nakaligoba.backend.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.command.PullImageResultCallback;
import com.github.dockerjava.api.command.WaitContainerResultCallback;
import com.github.dockerjava.api.model.Frame;
import com.github.dockerjava.core.command.LogContainerResultCallback;
import com.nakaligoba.backend.domain.Language;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class DockerTemplate {

    private final DockerClient dockerClient;

    public String run(Language language, String code) {
        pullImage(language);
        CreateContainerResponse container = createContainer(language, code);
        runContainer(container);
        String result = getRunResult(container);
        removeContainer(container);
        return result;
    }

    private void pullImage(Language language) {
        try {
            dockerClient.pullImageCmd(language.getImageName())
                    .withTag(language.getTag())
                    .exec(new PullImageResultCallback())
                    .awaitCompletion();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private CreateContainerResponse createContainer(Language language, String code) {
        String command = "python";
        String scriptArgument = "-c";
        return dockerClient.createContainerCmd(language.getImageName())
                .withCmd(command, scriptArgument, code)
                .exec();
    }

    private void runContainer(CreateContainerResponse container) {
        dockerClient.startContainerCmd(container.getId())
                .exec();
        try {
            dockerClient.waitContainerCmd(container.getId())
                    .exec(new WaitContainerResultCallback())
                    .awaitCompletion();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private String getRunResult(CreateContainerResponse container) {
        StringBuilder result = new StringBuilder();

        try {
            dockerClient.logContainerCmd(container.getId())
                    .withStdOut(true)
                    .withStdErr(true)
                    .withFollowStream(true)
                    .withTailAll()
                    .exec(new LogContainerResultCallback() {
                        @Override
                        public void onNext(Frame item) {
                            result.append(new String(item.getPayload(), StandardCharsets.UTF_8));
                        }
                    }).awaitCompletion();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return result.toString();
    }

    private void removeContainer(CreateContainerResponse container) {
        dockerClient.removeContainerCmd(container.getId())
                .exec();
    }
}
