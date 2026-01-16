package com.bugTracker.server.service;

import com.bugTracker.server.dao.ProjectModel;
import com.bugTracker.server.dao.UserModel;
import com.bugTracker.server.dao.UserProjectModel;
import com.bugTracker.server.dto.UserSearchResponseDTO;
import com.bugTracker.server.repository.ProjectRepository;
import com.bugTracker.server.repository.UserProjectRepository;
import com.bugTracker.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserProjectService {

    private final UserProjectRepository userProjectRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public UserProjectService(UserProjectRepository userProjectRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.userProjectRepository = userProjectRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public String getUserRole(String userId, String projectId) {
        return userProjectRepository
                .findByUserIdAndProjectId(userId, projectId)
                .map(UserProjectModel::getRole)
                .orElse(null);
    }

    public void addRelation(String user_id, String project_id, String role) {
        UserProjectModel userProjectModel = new UserProjectModel(user_id, project_id, role);
        userProjectRepository.save(userProjectModel);
    }

    public void updateRole(String user_id, String project_id, String role) {
        Optional<UserProjectModel> up = userProjectRepository.findByUserIdAndProjectId(user_id, project_id);
        if (up.isEmpty()) {
            return;
        }
        UserProjectModel userProject = up.get();
        userProject.setRole(role);
        userProjectRepository.save(userProject);
    }

    public void removeUserFromProject(String user_id, String project_id) {
        Optional<UserProjectModel> up = userProjectRepository.findByUserIdAndProjectId(user_id, project_id);
        if (up.isEmpty()) {
            return;
        }
        UserProjectModel userProject = up.get();
        userProjectRepository.delete(userProject);
    }

    public List<ProjectModel> getProjectsForUser(String userId) {
        List<UserProjectModel> relations = userProjectRepository.findByUserId(userId);

        if (relations.isEmpty()) {
            return List.of();
        }

        List<String> projectIds = new ArrayList<>();
        for (UserProjectModel relation : relations) {
            projectIds.add(relation.getProjectId());
        }
        return projectRepository.findAllById(projectIds);
    }

    public List<UserSearchResponseDTO> getUsersForProject(String projectId, String query) {
        String searchTrimmed = (query == null) ? "" : query.trim();

        // One DB call retrieves exactly who we need
        List<UserModel> users = userRepository.searchMembersByProject(projectId, searchTrimmed);

        return users.stream()
                .map(user -> {
                    UserSearchResponseDTO dto = new UserSearchResponseDTO();
                    dto.setUserId(user.getUserId());
                    dto.setName(user.getName());
                    dto.setEmail(user.getEmail());
                    return dto;
                })
                .toList();
    }
}
