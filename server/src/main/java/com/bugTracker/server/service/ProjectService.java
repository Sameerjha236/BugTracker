package com.bugTracker.server.service;

import com.bugTracker.server.model.ProjectModel;
import com.bugTracker.server.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public void createProject(String name, String description, String createdBy) {
        ProjectModel project = new ProjectModel(name, description,createdBy);
        projectRepository.addProject(project);
    }

    public ProjectModel getProject(String projectId) {
        return projectRepository.getProject(projectId);
    }

    public Map<String, ProjectModel> getAllProjects() {
        return projectRepository.getAllProjects();
    }
}
