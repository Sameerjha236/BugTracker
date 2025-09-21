package com.bugTracker.server.controllers;

import com.bugTracker.server.dto.LoginRequest;
import com.bugTracker.server.model.UserModel;
import com.bugTracker.server.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class MainController {
    private final UserService userManagement;

    public MainController(UserService userManagement) {
        this.userManagement = userManagement;
    }

    @GetMapping("/hello")
    public String printHello() {
        return "Hello";
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody LoginRequest request) {
        Map<String, Object> response = userManagement.validateCredentials(request.getEmail(),request.getPassword());
        boolean status = (Boolean) response.get("status");

        if(status) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @GetMapping("/dummy")
    public String addDummyUser() {
        userManagement.addDummyUser();
        return "User added";
    }
}
