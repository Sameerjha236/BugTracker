package com.bugTracker.server.dto.issue;

import com.bugTracker.server.dto.userDetails.UserDTO;

public class IssueDetailDTO {
    private String issueId;
    private String projectId;
    private String title;
    private String description;
    private String status;
    private String priority;
    private UserDTO assignee;


    public IssueDetailDTO() {

    }

    public IssueDetailDTO(String issueId, String projectId, String title, String description, String status, String priority, UserDTO assignee) {
        this.issueId = issueId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.assignee = assignee;
    }

    public String getIssueId() {
        return issueId;
    }

    public void setIssueId(String issueId) {
        this.issueId = issueId;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public UserDTO getAssignee() {
        return assignee;
    }

    public void setAssignee(UserDTO assignee) {
        this.assignee = assignee;
    }
}
