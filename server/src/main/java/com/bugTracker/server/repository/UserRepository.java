package com.bugTracker.server.repository;

import com.bugTracker.server.model.UserModel;
import com.bugTracker.server.utils.PasswordUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel,String> {
   Optional<UserModel> findByEmail(String email);
   boolean existsByEmail(String email);
}
