package com.bugTracker.server.service;

import com.bugTracker.server.dao.UserModel;
import com.bugTracker.server.repository.UserRepository;
import com.bugTracker.server.utils.PasswordUtils;
import com.bugTracker.server.utils.ValidationUtils;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // ------------------- LOGIN -------------------
    public Map<String, Object> validateCredentials(String email, String password) {
        Map<String, Object> response = new HashMap<>();

        Optional<UserModel> userOpt = userRepo.findByEmail(email);

        if (userOpt.isEmpty()) {
            response.put("message", "Email Id does not exist");
            response.put("status", false);
            return response;
        }

        UserModel user = userOpt.get();
        if (!PasswordUtils.verifyPassword(password, user.getPassword())) {
            response.put("message", "Invalid Password");
            response.put("status", false);
            return response;
        }

        response.put("message", "Successful");
        response.put("status", true);
        return response;
    }

    // ------------------- SIGNUP -------------------
    public Map<String, Object> checkCredentials(String email, String name, String password) {
        Map<String, Object> response = new HashMap<>();
        if (userRepo.existsByEmail(email)) {
            response.put("message", "Email id already exists");
            response.put("status", false);
        } else if (!ValidationUtils.isValidName(name)) {
            response.put("message", "Name must contain only letters and spaces (2–50 chars)");
            response.put("status", false);
        } else if (!ValidationUtils.isValidPassword(password)) {
            response.put("message", "Password must be at least 8 characters with upper, lower, digit, special char");
            response.put("status", false);
        } else {
            response.put("message", "Valid credentials");
            response.put("status", true);
        }
        return response;
    }

    public void createUser(String name, String email, String password) {
        String hashedPassword = PasswordUtils.hashPassword(password);
        UserModel user = new UserModel(name, email, hashedPassword);
        userRepo.save(user);
    }
}
