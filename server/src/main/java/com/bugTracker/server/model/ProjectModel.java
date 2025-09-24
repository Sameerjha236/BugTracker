package com.bugTracker.server.model;

import java.util.UUID;

public class ProjectModel {
    String projectId;
    String name;
    String description;
    String createdBy;

    public ProjectModel(String name, String description, String createdBy) {
        this.projectId = UUID.randomUUID().toString();;
        this.name = name;
        this.description = description;
        this.createdBy = createdBy;
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

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
