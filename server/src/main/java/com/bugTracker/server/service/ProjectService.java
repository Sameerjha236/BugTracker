package com.bugTracker.server.service;

import com.bugTracker.server.dao.ProjectModel;
import com.bugTracker.server.dto.project.ProjectDetailsDTO;
import com.bugTracker.server.dto.userDetails.UserDTO;
import com.bugTracker.server.repository.ProjectRepository;
import com.bugTracker.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public String createProject(String name, String description, String createdBy) {
        ProjectModel project = new ProjectModel(name, description, createdBy);
        projectRepository.save(project);
        return project.getProjectId();
    }

    public Optional<ProjectModel> getProject(String projectId) {
        return projectRepository.findById(projectId);
    }

    public Optional<ProjectDetailsDTO> getProjectDetails(String projectId) {
        Optional<ProjectModel> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isEmpty()) return Optional.empty();

        ProjectModel project = optionalProject.get();

        ProjectDetailsDTO dto = new ProjectDetailsDTO();
        dto.setDescription(project.getDescription());
        dto.setName(project.getName());
        dto.setProjectId(project.getProjectId());

        if (project.getOwner() != null) {
            userRepository.findById(project.getOwner()).ifPresent(user -> {
                UserDTO userDTO = new UserDTO();
                userDTO.setUserId(user.getUserId());
                userDTO.setName(user.getName());
                userDTO.setEmail(user.getEmail());
                dto.setOwner(userDTO);
            });
        }
        return Optional.of(dto);
    }


    public boolean updateProject(String projectId, Map<String, Object> updates) {
        Optional<ProjectModel> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isEmpty()) return false;

        ProjectModel project = optionalProject.get();

        // Only allow specific fields to be updated
        List<String> allowedFields = List.of("name", "description", "owner");
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
