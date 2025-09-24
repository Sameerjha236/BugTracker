package com.bugTracker.server.controllers;

import com.bugTracker.server.dto.CreateProjectRequest;
import com.bugTracker.server.service.ProjectService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
