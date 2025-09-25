package com.bugTracker.server.controllers;

import com.bugTracker.server.dto.LoginRequest;
import com.bugTracker.server.dto.SignupRequest;
import com.bugTracker.server.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userManagement;

    public UserController(UserService userManagement) {
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

    @PostMapping("/signup")
    public ResponseEntity<Map<String,Object>>  signup(@RequestBody SignupRequest request) {
        Map<String, Object> response = userManagement.checkCredentials( request.getEmail() ,request.getName(), request.getPassword());
        boolean status = (Boolean) response.get("status");
        if(!status) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        userManagement.createUser(request.getName(), request.getEmail(), request.getPassword());
        response.put("message", "User added successfully");
        response.put("status",true);
        return  ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
