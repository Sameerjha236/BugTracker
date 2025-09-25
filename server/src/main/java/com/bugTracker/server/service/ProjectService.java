package com.bugTracker.server.service;

import com.bugTracker.server.model.ProjectModel;
import com.bugTracker.server.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public void createProject(String name, String description, String createdBy) {
        ProjectModel project = new ProjectModel(name, description, createdBy);
        projectRepository.save(project);
    }

    public Optional<ProjectModel> getProject(String projectId) {
        return projectRepository.findById(projectId);
    }

    public List<ProjectModel> getAllProjects() {
        return projectRepository.findAll();
    }
}
