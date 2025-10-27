package com.bugTracker.server.service;

import com.bugTracker.server.dao.ProjectModel;
import com.bugTracker.server.dao.UserProjectModel;
import com.bugTracker.server.repository.ProjectRepository;
import com.bugTracker.server.repository.UserProjectRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserProjectService {

    private final UserProjectRepository userProjectRepository;
    private final ProjectRepository projectRepository;

    public UserProjectService(UserProjectRepository userProjectRepository, ProjectRepository projectRepository) {
        this.userProjectRepository = userProjectRepository;
        this.projectRepository = projectRepository;
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
}
