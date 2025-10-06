package com.bugTracker.server.service;

import com.bugTracker.server.dao.UserProjectModel;
import com.bugTracker.server.repository.UserProjectRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProjectService {

    private final UserProjectRepository userProjectRepository;

    public UserProjectService(UserProjectRepository userProjectRepository) {
        this.userProjectRepository = userProjectRepository;
    }

    public void addRelation(String user_id, String project_id, String role) {
        UserProjectModel userProjectModel = new UserProjectModel(user_id,project_id,role);
        userProjectRepository.save(userProjectModel);
    }

    public void updateRole(String user_id, String project_id, String role) {
        Optional<UserProjectModel> up = userProjectRepository.findByUserIdAndProjectId(user_id,project_id);
        if(up.isEmpty()) {
            System.out.println("not found");
            return;
        }
        UserProjectModel userProject = up.get();
        userProject.setRole(role);
        userProjectRepository.save(userProject);
    }

    public void removeUserFromProject(String user_id, String project_id) {
        Optional<UserProjectModel> up = userProjectRepository.findByUserIdAndProjectId(user_id,project_id);
        if(up.isEmpty()) {
            System.out.println("not found");
            return;
        }
        UserProjectModel userProject = up.get();
        userProjectRepository.delete(userProject);
    }

}
