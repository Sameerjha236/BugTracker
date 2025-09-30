package com.bugTracker.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "user_project")
public class UserProjectModel {

    @Id
    @Column(name = "user_project_id")
    private String userProjectId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "project_id")
    private String projectId;

    @Column(nullable = false)
    private String role;

    public UserProjectModel() {
    }

    public UserProjectModel(String userId, String projectId, String role) {
        this.userProjectId = UUID.randomUUID().toString();
        this.userId = userId;
        this.projectId = projectId;
        this.role = role;
    }

    public String getUserProjectId() {
        return userProjectId;
    }

    public void setUserProjectId(String userProjectId) {
        this.userProjectId = userProjectId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
