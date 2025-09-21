package com.bugTracker.server.service;

import com.bugTracker.server.model.UserModel;
import com.bugTracker.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

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


    public void addUser( String name, String email, String password, String role) {
        UserModel user = new UserModel("1",name,email,password,role);
        UserRepo.addUser(user);
    }

    public void addDummyUser() {
        addUser("sameer", "sam@gmail.com", "1234", "admin");
    }
}
