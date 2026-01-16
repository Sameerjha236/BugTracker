package com.bugTracker.server.controllers;

import com.bugTracker.server.dto.userDetails.LoginDTO;
import com.bugTracker.server.dto.userDetails.SignupDTO;
import com.bugTracker.server.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User Authentication", description = "Endpoints for user login and registration")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "User Login",
            description = "Authenticates a user and returns a status map along with user details if successful."
    )
    @ApiResponse(responseCode = "200", description = "Login successful")
    @ApiResponse(responseCode = "401", description = "Invalid email or password")
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDTO request) {
        Map<String, Object> response = userService.validateCredentials(request.getEmail(), request.getPassword());
        boolean status = (Boolean) response.get("status");

        if (status) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @Operation(
            summary = "Register a new user",
            description = "Validates credentials and creates a new user account in the system."
    )
    @ApiResponse(responseCode = "201", description = "User created successfully")
    @ApiResponse(responseCode = "400", description = "Email already exists or invalid data")
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody SignupDTO request) {
        Map<String, Object> response = userService.checkCredentials(request.getEmail(), request.getName(), request.getPassword());
        boolean status = (Boolean) response.get("status");
        if (!status) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        userService.createUser(request.getName(), request.getEmail(), request.getPassword());
        response.put("message", "User added successfully");
        response.put("status", true);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}