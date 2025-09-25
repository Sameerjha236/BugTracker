package com.bugTracker.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "projects")
public class ProjectModel {
    @Id
    @Column(name = "projectid")
    private String projectId;

    @Column(name = "createdby")   // <-- match Postgres
    private String createdBy;// same as Users

    private String name;
    private String description;

    public ProjectModel() {}

    public ProjectModel(String name, String description, String createdBy) {
        this.projectId = UUID.randomUUID().toString();
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
