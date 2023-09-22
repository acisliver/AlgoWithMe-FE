package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.MemberService;
import com.nakaligoba.backend.service.MemberService.MemberDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

@Slf4j
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private static final int saltByteLength = 16;
    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest request) {
        String salt = createSalt();
        String encryptedPassword = encryptPasswordBySHA256(request.getPassword(), salt);

        MemberDto memberDto = MemberDto.builder()
                .email(request.getEmail())
                .password(encryptedPassword)
                .name(request.getName())
                .build();

        // TODO : 추후 예외처리 필요
        memberService.signup(memberDto);

        return ResponseEntity.ok(new SignupResponse("회원가입이 완료되었습니다."));
    }

    public String createSalt() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[saltByteLength];
        secureRandom.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    public String encryptPasswordBySHA256(String password, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt.getBytes(StandardCharsets.UTF_8));
            byte[] hashedPassword = md.digest(password.getBytes(StandardCharsets.UTF_8));

            return Base64.getEncoder().encodeToString(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    /*
    @PostMapping("/signin")
    public ResponseEntity<SigninRequest> signin(@RequestBody SigninRequest request) {

        return ResponseEntity.ok();
    }
     */

    @Data
    static class SignupRequest {
        @NotBlank
        private final String email;
        @NotBlank
        private final String password;
        @NotBlank
        private final String name;
    }

    @Data
    static class SigninRequest {
        @NotBlank
        private final String email;
        @NotBlank
        private final String password;
    }

    @Data
    static class SignupResponse {
        private final String message;
    }

    @Data
    static class SigninResponse {
        private final String accessToken;
        private final String message;
    }
}
