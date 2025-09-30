package com.bugTracker.server.controllers;

import com.bugTracker.server.dto.AddUsersToProject;
import com.bugTracker.server.dto.CreateProjectRequest;
import com.bugTracker.server.dto.UserProjectDetails;
import com.bugTracker.server.model.ProjectModel;
import com.bugTracker.server.service.ProjectService;
import com.bugTracker.server.service.UserProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
    private final ProjectService projectManagement;
    private final UserProjectService userProjectService;

    public ProjectController(ProjectService projectManagement, UserProjectService userProjectService) {
        this.projectManagement = projectManagement;
        this.userProjectService = userProjectService;
    }

    @PostMapping("/createProject")
    public String createProject(@RequestBody CreateProjectRequest request) {
        String project_id = projectManagement.createProject(request.getName(), request.getDescription(), request.getCreatedBy());
        userProjectService.addRelation(request.getCreatedBy(), project_id, "Admin");
        return "Project has been created";
    }

    @PostMapping("/addUser")
    public String addUser(@RequestBody AddUsersToProject request) {
        userProjectService.addRelation(request.getUser_id(), request.getProject_id(), request.getRole());
        return "User added to the project";
    }

    @PostMapping("/updateUserRole")
    public String updateRole(@RequestBody AddUsersToProject request) {
        userProjectService.updateRole(request.getUser_id(),request.getProject_id(),request.getRole());
        return "Role updated";
    }

    @PostMapping("/removeUser")
    public String removeUser(@RequestBody UserProjectDetails request) {
        userProjectService.removeUserFromProject(request.getUser_id(),request.getProject_id());
        return "User removed from project";
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProject(@PathVariable String projectId) {
        Optional<ProjectModel> projectOpt = projectManagement.getProject(projectId);

        if (projectOpt.isPresent()) {
            return ResponseEntity.ok(projectOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Project with ID " + projectId + " not found");
        }
    }

}
