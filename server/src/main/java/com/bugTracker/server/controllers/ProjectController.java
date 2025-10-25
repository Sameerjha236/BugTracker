package com.bugTracker.server.controllers;

import com.bugTracker.server.dto.AddUsersToProjectdto;
import com.bugTracker.server.dto.CreateProjectdto;
import com.bugTracker.server.dao.ProjectModel;
import com.bugTracker.server.service.ProjectService;
import com.bugTracker.server.service.UserProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectService projectService;
    private final UserProjectService userProjectService;

    public ProjectController(ProjectService projectService, UserProjectService userProjectService) {
        this.projectService = projectService;
        this.userProjectService = userProjectService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createProject(@RequestBody CreateProjectdto request) {
        String projectId = projectService.createProject(
                request.getName(),
                request.getDescription(),
                request.getOwner()
        );
        userProjectService.addRelation(request.getOwner(), projectId, "admin");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Project has been created with ID: " + projectId);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProject(@PathVariable String projectId) {
        Optional<ProjectModel> projectOpt = projectService.getProject(projectId);

        return projectOpt.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Project with ID " + projectId + " not found"));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getProjectsForUser(@PathVariable String userId) {
        System.out.println("Yo"+ userId);
        List<ProjectModel> projects = userProjectService.getProjectsForUser(userId);
        if (projects.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        return ResponseEntity.ok(projects);
    }

    @PatchMapping("/update/{projectId}")
    public ResponseEntity<String> updateProject(
            @PathVariable String projectId,
            @RequestBody Map<String, Object> request) {

        boolean updated = projectService.updateProject(projectId, request);
        if (updated)
            return ResponseEntity.ok("Project updated successfully");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Project with ID " + projectId + " not found");
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable String projectId) {
        boolean deleted = projectService.deleteProject(projectId);
        if (deleted)
            return ResponseEntity.ok("Project deleted successfully");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Project with ID " + projectId + " not found");
    }

    @PostMapping("/{projectId}/addUser")
    public ResponseEntity<String> addUser(
            @PathVariable String projectId,
            @RequestBody AddUsersToProjectdto request) {

        userProjectService.addRelation(request.getUser_id(), projectId, request.getRole());
        return ResponseEntity.ok("User added to the project");
    }

    @PatchMapping("/{projectId}/updateUserRole")
    public ResponseEntity<String> updateUserRole(
            @PathVariable String projectId,
            @RequestBody AddUsersToProjectdto request) {

        userProjectService.updateRole(request.getUser_id(), projectId, request.getRole());
        return ResponseEntity.ok("User role updated successfully");
    }

    @DeleteMapping("/{projectId}/removeUser")
    public ResponseEntity<String> removeUser(
            @PathVariable String projectId,
            @RequestBody String userId) {

        userProjectService.removeUserFromProject(userId, projectId);
        return ResponseEntity.ok("User removed from project");
    }
}
