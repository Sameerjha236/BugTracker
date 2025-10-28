package com.bugTracker.server.projection;
import java.time.LocalDateTime;

public interface IssueSummaryProjection {
    String getIssueId();
    String getTitle();
    String getStatus();
    String getPriority();
    LocalDateTime getCreatedAt();
}