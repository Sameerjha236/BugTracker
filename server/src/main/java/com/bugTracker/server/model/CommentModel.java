package com.bugTracker.server.model;

import java.util.UUID;

public class CommentModel {
    String commentId;
    String issueId;
    String userId;
    String text;
    String createdAt;

    public CommentModel(String issueId, String userId, String text, String createdAt) {
        this.commentId = UUID.randomUUID().toString();
        this.issueId = issueId;
        this.userId = userId;
        this.text = text;
        this.createdAt = createdAt;
    }

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

    public String getIssueId() {
        return issueId;
    }

    public void setIssueId(String issueId) {
        this.issueId = issueId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
