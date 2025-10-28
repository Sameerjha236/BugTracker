package com.bugTracker.server.controllers;

import com.bugTracker.server.dto.CreateIssuedto;
import com.bugTracker.server.service.IssueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/issue")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    // ✅ Get all issues for a project (returns [] if none)
    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getIssuesByProject(@PathVariable String projectId) {
        var issues = issueService.getIssuesByProjectId(projectId);
        return ResponseEntity.ok(issues == null ? Collections.emptyList() : issues);
    }

    // ✅ Create a new issue
    @PostMapping("/create")
    public ResponseEntity<String> createIssue(@RequestBody CreateIssuedto request) {
        System.out.println("reached here");
        String issueId = issueService.createIssue(
                request.getProjectId(),
                request.getTitle(),
                request.getDescription(),
                request.getStatus(),
                request.getAssigneeId(),
                request.getPriority()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Issue created with ID: " + issueId);
    }

    // ✅ Update issue details
    @PatchMapping("/update/{issueId}")
    public ResponseEntity<String> updateIssue(
            @PathVariable String issueId,
            @RequestBody Map<String, Object> updates) {

        boolean updated = issueService.updateIssue(issueId, updates);

        if (updated)
            return ResponseEntity.ok("Issue updated successfully");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Issue with ID " + issueId + " not found");
    }

    // ✅ Get single issue by ID
    @GetMapping("/{issueId}")
    public ResponseEntity<?> getIssue(@PathVariable String issueId) {
        return issueService.getIssue(issueId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Issue with ID " + issueId + " not found"));
    }

    // ✅ Delete an issue
    @DeleteMapping("/{issueId}")
    public ResponseEntity<String> deleteIssue(@PathVariable String issueId) {
        boolean deleted = issueService.deleteIssue(issueId);
        if (deleted)
            return ResponseEntity.ok("Issue deleted successfully");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Issue with ID " + issueId + " not found");
    }
}
