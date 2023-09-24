package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.MemberService;
import com.nakaligoba.backend.service.MemberService.MemberDto;
import com.nakaligoba.backend.utils.JwtUtils;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;

@Slf4j
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest request) {
        MemberDto memberDto = MemberDto.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .name(request.getName())
                .build();

        // TODO : 추후 예외처리 필요
        memberService.signup(memberDto);

        return ResponseEntity.ok(new SignupResponse("회원가입이 완료되었습니다."));
    }

    // 로그인
    @PostMapping("/signin")
    public ResponseEntity<SigninResponse> signin(@RequestBody SigninRequest request) {
        MemberDto memberDto = MemberDto.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .build();

        // TODO : 추후 예외처리 필요
        String jwt = memberService.signin(memberDto);

        return ResponseEntity.ok(new SigninResponse(JwtUtils.BEARER + jwt, "정상적으로 로그인 되었습니다."));
    }

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
    static class SignupResponse {
        private final String message;
    }

    @Data
    static class SigninRequest {
        @NotBlank
        private final String email;

        @NotBlank
        private final String password;
    }

    @Data
    static class SigninResponse {
        private final String accessToken;
        private final String message;
    }
}
