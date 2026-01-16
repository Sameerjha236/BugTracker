package com.bugTracker.server.repository;

import com.bugTracker.server.dao.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, String> {
    Optional<UserModel> findByEmail(String email);

    boolean existsByEmail(String email);

    List<UserModel> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String name,
            String email
    );

    @Query("SELECT u FROM UserModel u JOIN UserProjectModel up ON u.userId = up.userId " +
            "WHERE up.projectId = :projectId " +
            "AND (LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<UserModel> searchMembersByProject(String projectId, String query);
}
