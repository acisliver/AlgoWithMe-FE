package com.nakaligoba.backend.repository;

import com.nakaligoba.backend.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
    boolean existsByEmail(String email);

    MemberEntity findByEmail(String email);
}
