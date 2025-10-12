package com.bugTracker.server.controllers;

import com.bugTracker.server.dto.Logindto;
import com.bugTracker.server.dto.Signupdto;
import com.bugTracker.server.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody Logindto request) {
        Map<String, Object> response = userService.validateCredentials(request.getEmail(),request.getPassword());
        boolean status = (Boolean) response.get("status");

        if(status) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String,Object>>  register(@RequestBody Signupdto request) {
        Map<String, Object> response = userService.checkCredentials( request.getEmail() ,request.getName(), request.getPassword());
        boolean status = (Boolean) response.get("status");
        if(!status) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        userService.createUser(request.getName(), request.getEmail(), request.getPassword());
        response.put("message", "User added successfully");
        response.put("status",true);
        return  ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
