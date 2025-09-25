package com.bugTracker.server.controllers;

import com.bugTracker.server.dto.CreateProjectRequest;
import com.bugTracker.server.model.ProjectModel;
import com.bugTracker.server.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
    private final ProjectService projectManagement;

    public ProjectController(ProjectService projectManagement) {
        this.projectManagement = projectManagement;
    }

    @PostMapping("/createProject")
    public String createProject(@RequestBody CreateProjectRequest request) {
        projectManagement.createProject(request.getName(), request.getDescription(), request.getCreatedBy());
        return "Project has been created";
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
