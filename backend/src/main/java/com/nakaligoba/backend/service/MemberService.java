package com.nakaligoba.backend.service;

import com.nakaligoba.backend.entity.MemberEntity;
import com.nakaligoba.backend.repository.MemberRepository;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public void signup(MemberDto memberDto) {
        if(memberRepository.existsByEmail(memberDto.email)) {
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }

        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setEmail(memberDto.email);
        memberEntity.setPassword(memberDto.password);
        memberEntity.setName(memberDto.name);
        memberEntity.setCreatedAt(LocalDateTime.now());
        memberEntity.setUpdatedAt(LocalDateTime.now());

        memberRepository.save(memberEntity);
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberDto {
        private String email;
        private String password;
        private String name;
        private String salt;
    }
}