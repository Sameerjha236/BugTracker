package com.bugTracker.server.model;

import java.util.UUID;

public class UserProjectModel {
    String relationId;
    String userId;
    String projectId;
    String role;

    public UserProjectModel( String userId, String projectId, String role) {
        this.relationId = UUID.randomUUID().toString();
        this.userId = userId;
        this.projectId = projectId;
        this.role = role;
    }

    public String getRelationId() {
        return relationId;
    }

    public void setRelationId(String relationId) {
        this.relationId = relationId;
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
