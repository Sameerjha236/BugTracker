package com.bugTracker.server.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "projects")
public class ProjectModel {
    @Id
    private String projectId;

    private String owner;

    private String name;
    private String description;

    public ProjectModel() {}

    public ProjectModel(String name, String description, String owner) {
        this.projectId = UUID.randomUUID().toString();
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

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}
