package com.bugTracker.server.repository;

import com.bugTracker.server.model.ProjectModel;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class ProjectRepository {
    private final Map<String, ProjectModel> projectData = new HashMap<>();

    public void addProject(ProjectModel project) {
        projectData.put(project.getProjectId(), project);
    }

    public ProjectModel getProject(String projectId) {
        return projectData.get(projectId);
    }

    public Map<String, ProjectModel> getAllProjects() {
        return projectData;
    }
}
