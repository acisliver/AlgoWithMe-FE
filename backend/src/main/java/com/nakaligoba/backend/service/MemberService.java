package com.nakaligoba.backend.service;

import com.nakaligoba.backend.entity.MemberEntity;
import com.nakaligoba.backend.jwt.JwtProvider;
import com.nakaligoba.backend.repository.MemberRepository;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtProvider jwtProvider;

    @Transactional
    public void signup(MemberDto memberDto) {
        if (memberRepository.existsByEmail(memberDto.email)) {
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }

        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setEmail(memberDto.email);
        memberEntity.setPassword(passwordEncoder.encode(memberDto.password));
        memberEntity.setName(memberDto.name);
        memberEntity.setCreatedAt(LocalDateTime.now());
        memberEntity.setUpdatedAt(LocalDateTime.now());

        memberRepository.save(memberEntity);
    }

    @Transactional
    public String signin(MemberDto memberDto) {
        if (memberRepository.existsByEmail(memberDto.email)) {
            MemberEntity memberEntity = memberRepository.findByEmail(memberDto.email);

            if (passwordEncoder.matches(memberDto.password, memberEntity.getPassword())) {
                UsernamePasswordAuthenticationToken authenticationToken
                        = new UsernamePasswordAuthenticationToken(memberDto.getEmail(), memberDto.getPassword());
                Authentication authentication
                        = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                return jwtProvider.createJwt(authentication);
            } else {
                throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
            }
        } else {
            throw new IllegalArgumentException("사용자 정보를 찾을 수 없습니다.");
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberDto {
        private String email;
        private String password;
        private String name;
    }
}