package com.bugTracker.server.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "issues")
public class IssueModel {
    @Id
    String issueId;
    String projectId;
    String title;
    String description;
    String status;
    String priority;
    String assigneeId;
    LocalDateTime createdAt;

    public IssueModel() {
    }

    public IssueModel(String assigneeId, String priority, String status, String description, String title, String projectId) {
        this.issueId = UUID.randomUUID().toString();
        this.assigneeId = assigneeId;
        this.priority = priority;
        this.status = status;
        this.description = description;
        this.title = title;
        this.projectId = projectId;
        this.createdAt = LocalDateTime.now();
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

    public String getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(String assigneeId) {
        this.assigneeId = assigneeId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
