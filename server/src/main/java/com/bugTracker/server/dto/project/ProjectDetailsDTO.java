package com.bugTracker.server.dto.project;

import com.bugTracker.server.dto.userDetails.UserDTO;

public class ProjectDetailsDTO {
    String projectId;
    String name;
    String description;
    UserDTO owner;

    public ProjectDetailsDTO() {
    }

    public ProjectDetailsDTO(String projectId, String name, String description, UserDTO owner) {
        this.projectId = projectId;
        this.name = name;
        this.description = description;
        this.owner = owner;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserDTO getOwner() {
        return owner;
    }

    public void setOwner(UserDTO owner) {
        this.owner = owner;
    }
}
