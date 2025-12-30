package com.bugTracker.server.dto.comment;

import com.bugTracker.server.dto.userDetails.UserDTO;

public class CommentDetailDTO {
    String commentId;
    String issueId;
    String text;
    String createdAt;
    UserDTO author;

    public CommentDetailDTO() {
    }

    public CommentDetailDTO(String commentId, String issueId, String text, String createdAt, UserDTO author) {
        this.commentId = commentId;
        this.issueId = issueId;
        this.text = text;
        this.createdAt = createdAt;
        this.author = author;
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

    public UserDTO getAuthor() {
        return author;
    }

    public void setAuthor(UserDTO author) {
        this.author = author;
    }
}
