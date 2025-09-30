package com.bugTracker.server.dto;

public class AddUsersToProject {
    private String user_id;
    private String project_id;
    private String role;

    public AddUsersToProject(String user_id, String project_id, String role) {
        this.user_id = user_id;
        this.project_id = project_id;
        this.role = role;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getProject_id() {
        return project_id;
    }

    public void setProject_id(String project_id) {
        this.project_id = project_id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
