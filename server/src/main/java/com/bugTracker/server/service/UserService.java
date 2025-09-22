package com.bugTracker.server.service;

import com.bugTracker.server.model.UserModel;
import com.bugTracker.server.repository.UserRepository;
import com.bugTracker.server.utils.PasswordUtils;
import com.bugTracker.server.utils.ValidationUtils;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository UserRepo;

    public UserService(UserRepository userRepo) {
        UserRepo = userRepo;
    }

    public Map<String, Object> validateCredentials(String email, String password) {
        Map<String, Object> response = new HashMap<>();

        if (!UserRepo.findEmailById(email)) {
            response.put("message", "Email Id does not exist");
            response.put("status", false);
            return response;
        }

        if (!UserRepo.checkCredentials(email, password)) {
            response.put("message", "Invalid Password");
            response.put("status", false);
            return response;
        }

        response.put("message", "Successful");
        response.put("status", true);
        return response;
    }

    public void createUser(String name, String email, String password, String role) {
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();
        String hashPassword = PasswordUtils.hashPassword(password);
        UserModel user = new UserModel(id, name, email, hashPassword, role);
        UserRepo.addUser(user);
    }

    public Map<String, Object> checkCredentials(String email, String name, String password) {
        Map<String, Object> response = new HashMap<>();
        if(UserRepo.findEmailById(email)) {
            response.put("message", "Email id already exist");
            response.put("status", false);
        }
        else if(!ValidationUtils.isValidName(name)) {
            response.put("message", "Name must contain only letters and spaces (2–50 chars)");
            response.put("status", false);
        }
        else if(!ValidationUtils.isValidPassword(password)) {
            response.put("message", "Password must be at least 8 characters with upper, lower, digit, special char");
            response.put("status", false);
        }
        else {
            response.put("message", "Valid credentials");
            response.put("status", true);
        }
        return response;
    }

    public void addDummyUser() {
        createUser("sameer", "sam@gmail.com", "1234", "admin");
    }
}
