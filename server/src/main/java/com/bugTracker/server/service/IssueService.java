package com.bugTracker.server.service;

import com.bugTracker.server.dao.IssueModel;
import com.bugTracker.server.projection.IssueSummaryProjection;
import com.bugTracker.server.repository.IssueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class IssueService {
    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    // ✅ Get all issues belonging to a specific project
    public List<IssueSummaryProjection> getIssuesByProjectId(String projectId) {
        return issueRepository.findByProjectId(projectId);
    }

    // ✅ Create a new issue
    public String createIssue(String projectId, String title, String description,
                              String status, String assigneeId, String priority) {

        IssueModel issue = new IssueModel(assigneeId, priority, status, description, title, projectId);
        issueRepository.save(issue);
        return issue.getIssueId();
    }

    // ✅ Get single issue by ID
    public Optional<IssueModel> getIssue(String issueId) {
        return issueRepository.findById(issueId);
    }

    // ✅ Update issue with partial fields
    public boolean updateIssue(String issueId, Map<String, Object> updates) {
        Optional<IssueModel> optionalIssue = issueRepository.findById(issueId);
        if (optionalIssue.isEmpty()) return false;

        IssueModel issue = optionalIssue.get();

        // Define allowed fields
        List<String> allowedFields = List.of("title", "description", "status", "priority", "assigneeId");

        updates.forEach((key, value) -> {
            if (!allowedFields.contains(key)) return;

            switch (key) {
                case "title" -> issue.setTitle((String) value);
                case "description" -> issue.setDescription((String) value);
                case "status" -> issue.setStatus((String) value);
                case "priority" -> issue.setPriority((String) value);
                case "assigneeId" -> issue.setAssigneeId((String) value);
            }
        });

        issueRepository.save(issue);
        return true;
    }

    // ✅ Delete issue by ID
    public boolean deleteIssue(String issueId) {
        if (!issueRepository.existsById(issueId)) {
            return false;
        }
        issueRepository.deleteById(issueId);
        return true;
    }
}
