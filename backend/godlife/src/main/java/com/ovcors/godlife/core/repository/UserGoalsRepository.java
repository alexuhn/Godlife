package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.goals.UserGoals;
import com.ovcors.godlife.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserGoalsRepository extends JpaRepository<UserGoals, UUID> {
    List<UserGoals> findByUserSeq(UUID userSeq);
    void deleteById(UUID seq);
}
