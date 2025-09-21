package com.bugTracker.server.repository;

import com.bugTracker.server.model.UserModel;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class UserRepository {
    private final Map<String,UserModel> UserData = new HashMap<>();

    public boolean findEmailById(String email) {
        return UserData.containsKey(email);
    }

    public void addUser(UserModel user) {
        String email = user.getEmail();
        UserData.put(email, user);
    }

    public boolean checkCredentials(String email, String password) {
        String actualPassword = UserData.get(email).getPassword();
        return  actualPassword.equals(password);
    }
}
