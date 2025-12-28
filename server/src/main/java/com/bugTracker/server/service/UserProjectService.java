package com.bugTracker.server.service;

import com.bugTracker.server.dao.ProjectModel;
import com.bugTracker.server.dao.UserModel;
import com.bugTracker.server.dao.UserProjectModel;
import com.bugTracker.server.repository.ProjectRepository;
import com.bugTracker.server.repository.UserProjectRepository;
import com.bugTracker.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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
        UserProjectModel userProjectModel = new UserProjectModel(user_id,project_id,role);
        userProjectRepository.save(userProjectModel);
    }

    public void updateRole(String user_id, String project_id, String role) {
        Optional<UserProjectModel> up = userProjectRepository.findByUserIdAndProjectId(user_id,project_id);
        if(up.isEmpty()) {
            return;
        }
        UserProjectModel userProject = up.get();
        userProject.setRole(role);
        userProjectRepository.save(userProject);
    }

    public void removeUserFromProject(String user_id, String project_id) {
        Optional<UserProjectModel> up = userProjectRepository.findByUserIdAndProjectId(user_id,project_id);
        if(up.isEmpty()) {
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

    public List<Map<String, Object>> getUsersForProject(String projectId) {
        List<UserProjectModel> relations = userProjectRepository.findByProjectId(projectId);

        if (relations.isEmpty()) {
            return List.of();
        }

        List<String> userIds = relations.stream()
                .map(UserProjectModel::getUserId)
                .collect(Collectors.toList());

        List<UserModel> users = userRepository.findAllById(userIds);

        // Combine user details + their project role
        List<Map<String, Object>> userDetails = new ArrayList<>();

        for (UserModel user : users) {
            Optional<UserProjectModel> relation = relations.stream()
                    .filter(r -> r.getUserId().equals(user.getUserId()))
                    .findFirst();

            Map<String, Object> userData = new HashMap<>();
            userData.put("userId", user.getUserId());
            userData.put("name", user.getName());
            userData.put("email", user.getEmail());
            userData.put("role", relation.map(UserProjectModel::getRole).orElse("member"));

            userDetails.add(userData);
        }
        return userDetails;
    }


}
