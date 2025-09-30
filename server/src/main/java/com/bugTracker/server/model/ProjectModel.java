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
    private String project_id;

    private String created_by;// same as Users

    private String name;
    private String description;

    public ProjectModel() {}

    public ProjectModel(String name, String description, String created_by) {
        this.project_id = UUID.randomUUID().toString();
        this.name = name;
        this.description = description;
        this.created_by = created_by;
    }

    public String getProjectId() {
        return project_id;
    }

    public void setProjectId(String project_id) {
        this.project_id = project_id;
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
        return created_by;
    }

    public void setCreatedBy(String created_by) {
        this.created_by = created_by;
    }
}
