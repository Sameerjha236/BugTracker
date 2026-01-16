package com.bugTracker.server.controllers;

import com.bugTracker.server.dao.ProjectModel;
import com.bugTracker.server.dto.UserSearchResponseDTO;
import com.bugTracker.server.dto.project.AddUsersToProjectDTO;
import com.bugTracker.server.dto.project.CreateProjectDTO;
import com.bugTracker.server.dto.project.ProjectDetailsDTO;
import com.bugTracker.server.service.ProjectService;
import com.bugTracker.server.service.UserProjectService;
import com.bugTracker.server.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/project")
@Tag(name = "Project Management", description = "Endpoints for creating projects and managing team memberships")
public class ProjectController {

    private final ProjectService projectService;
    private final UserProjectService userProjectService;
    private final UserService userService;

    public ProjectController(ProjectService projectService, UserProjectService userProjectService, UserService userService) {
        this.projectService = projectService;
        this.userProjectService = userProjectService;
        this.userService = userService;
    }

    @Operation(summary = "Create a project", description = "Initializes a new project and assigns the owner as the 'admin' role.")
    @ApiResponse(responseCode = "201", description = "Project created successfully")
    @PostMapping("/create")
    public ResponseEntity<String> createProject(@RequestBody CreateProjectDTO request) {
        String projectId = projectService.createProject(
                request.getName(),
                request.getDescription(),
                request.getOwner()
        );
        userProjectService.addRelation(request.getOwner(), projectId, "admin");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Project has been created with ID: " + projectId);
    }

    @Operation(summary = "Get project details", description = "Fetches metadata and members for a specific project.")
    @ApiResponse(responseCode = "200", description = "Project found")
    @ApiResponse(responseCode = "404", description = "Project not found")
    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProject(@PathVariable String projectId) {
        Optional<ProjectDetailsDTO> projectOpt = projectService.getProjectDetails(projectId);
        return projectOpt.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Project with ID " + projectId + " not found"));
    }

    @Operation(summary = "Get user role in project", description = "Returns the specific role (e.g., admin, developer) of a user within a project.")
    @GetMapping("/{projectId}/role/{userId}")
    public ResponseEntity<?> getUserRole(
            @PathVariable String projectId,
            @PathVariable String userId
    ) {
        String role = userProjectService.getUserRole(userId, projectId);
        if (role == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not part of this project");
        }
        return ResponseEntity.ok(Map.of("role", role));
    }

    @Operation(summary = "Get all projects for a user", description = "Returns a list of all projects a specific user is a member of.")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProjectModel>> getProjectsForUser(@PathVariable String userId) {
        List<ProjectModel> projects = userProjectService.getProjectsForUser(userId);
        return ResponseEntity.ok(projects == null ? Collections.emptyList() : projects);
    }

    @Operation(
            summary = "Update project details",
            description = "Allows updating name or description fields via a map.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = @Content(examples = @ExampleObject(value = "{ \"name\": \"New Project Name\", \"description\": \"Updated description\" }"))
            )
    )
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

    @Operation(summary = "Delete a project", description = "Removes the project and all associated data.")
    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(@PathVariable String projectId) {
        boolean deleted = projectService.deleteProject(projectId);
        if (deleted)
            return ResponseEntity.ok("Project deleted successfully");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Project with ID " + projectId + " not found");
    }

    @Operation(summary = "Add user to project", description = "Assigns a user to a project with a specific role.")
    @PostMapping("/{projectId}/addUser")
    public ResponseEntity<String> addUser(
            @PathVariable String projectId,
            @RequestBody AddUsersToProjectDTO request) {

        userProjectService.addRelation(request.getUser_id(), projectId, request.getRole());
        return ResponseEntity.ok("User added to the project");
    }

    @Operation(summary = "Update user role", description = "Changes the role of an existing user within the project.")
    @PatchMapping("/{projectId}/updateUserRole")
    public ResponseEntity<String> updateUserRole(
            @PathVariable String projectId,
            @RequestBody AddUsersToProjectDTO request) {

        userProjectService.updateRole(request.getUser_id(), projectId, request.getRole());
        return ResponseEntity.ok("User role updated successfully");
    }

    @Operation(summary = "Remove user from project")
    @DeleteMapping("/{projectId}/removeUser")
    public ResponseEntity<String> removeUser(
            @PathVariable String projectId,
            @RequestBody String userId) {

        userProjectService.removeUserFromProject(userId, projectId);
        return ResponseEntity.ok("User removed from project");
    }

    @Operation(
            summary = "Search users to add",
            description = "Searches for users by name or email who are NOT currently members of this project."
    )
    @GetMapping("/{projectId}/search-users")
    public ResponseEntity<List<UserSearchResponseDTO>> searchUsers(
            @PathVariable String projectId,
            @Parameter(description = "Search query (name or email)") @RequestParam String q
    ) {
        return ResponseEntity.ok(
                userService.searchUsersNotInProject(projectId, q)
        );
    }

    @Operation(
            summary = "Get all project members",
            description = "Fetches a list of all users currently assigned to the project along with their specific roles."
    )
    @ApiResponse(responseCode = "200", description = "List of members retrieved successfully")
    @GetMapping("/{projectId}/members")
    public ResponseEntity<List<UserSearchResponseDTO>> getProjectMembers(
            @PathVariable String projectId,
            @RequestParam(required = false, defaultValue = "") String q) {
        return ResponseEntity.ok(
                userProjectService.getUsersForProject(projectId, q)
        );
    }
}