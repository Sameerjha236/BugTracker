package com.bugTracker.server.repository;

import com.bugTracker.server.model.UserProjectModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserProjectRepository extends JpaRepository<UserProjectModel, String> {
    Optional<UserProjectModel> findByUserIdAndProjectId(String userId, String projectId);
}
