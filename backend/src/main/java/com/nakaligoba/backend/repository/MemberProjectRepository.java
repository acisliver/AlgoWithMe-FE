package com.nakaligoba.backend.repository;

import com.nakaligoba.backend.entity.MemberEntity;
import com.nakaligoba.backend.entity.MemberProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberProjectRepository extends JpaRepository<MemberProjectEntity, Long> {
    MemberProjectEntity findByMemberAndProjectId(MemberEntity member, Long projectId);
}
