package com.bugTracker.server.dto;

public class UserProjectDetails {
    private String user_id;
    private String project_id;

    public UserProjectDetails(String user_id, String project_id) {
        this.user_id = user_id;
        this.project_id = project_id;
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
}

