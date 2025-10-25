package com.bugTracker.server.service;

import com.bugTracker.server.dao.ProjectModel;
import com.bugTracker.server.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public String createProject(String name, String description, String createdBy) {
        ProjectModel project = new ProjectModel(name, description, createdBy);
        projectRepository.save(project);
        return project.getProjectId();
    }

    public Optional<ProjectModel> getProject(String projectId) {
        return projectRepository.findById(projectId);
    }

//    public Optional<ProjectModel[]> getProjectsForUser(String userId) {
//
//        return [];
//    }

    public boolean updateProject(String projectId, Map<String, Object> updates) {
        Optional<ProjectModel> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isEmpty()) return false;

        ProjectModel project = optionalProject.get();

        // Only allow specific fields to be updated
        List<String> allowedFields = List.of("name", "description","owner");
        updates.forEach((key, value) -> {
            if (!allowedFields.contains(key)) return;
            switch (key) {
                case "name" -> project.setName((String) value);
                case "description" -> project.setDescription((String) value);
            }
        });

        projectRepository.save(project);
        return true;
    }

    public boolean deleteProject(String projectId) {
        if (!projectRepository.existsById(projectId)) {
            return false;
        }
        projectRepository.deleteById(projectId);
        return true;
    }


    public List<ProjectModel> getAllProjects() {
        return projectRepository.findAll();
    }


}
