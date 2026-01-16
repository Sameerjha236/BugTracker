package com.bugTracker.server.controllers;

import com.bugTracker.server.dto.issue.CreateIssueDTO;
import com.bugTracker.server.service.IssueService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/issue")
@Tag(name = "Issue Management", description = "Endpoints for handling bug reports and task tracking")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @Operation(summary = "Get all issues for a project", description = "Returns an array of issues. Returns an empty list if no issues are found.")
    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getIssuesByProject(@PathVariable String projectId) {
        var issues = issueService.getIssuesByProjectId(projectId);
        return ResponseEntity.ok(issues == null ? Collections.emptyList() : issues);
    }

    @Operation(summary = "Create a new issue", description = "Generates a new bug report or task within a specific project.")
    @ApiResponse(responseCode = "201", description = "Issue successfully created")
    @PostMapping("/create")
    public ResponseEntity<String> createIssue(@RequestBody CreateIssueDTO request) {
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

    @Operation(
            summary = "Update issue details",
            description = "Partially updates issue fields (title, status, priority, etc.) using a map of updates.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = @Content(examples = @ExampleObject(
                            value = "{ \"status\": \"IN_PROGRESS\", \"priority\": \"HIGH\" }"
                    ))
            )
    )
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

    @Operation(summary = "Get issue by ID", description = "Fetches detailed information for a single issue.")
    @ApiResponse(responseCode = "200", description = "Issue found")
    @ApiResponse(responseCode = "404", description = "Issue not found")
    @GetMapping("/{issueId}")
    public ResponseEntity<?> getIssue(@PathVariable String issueId) {
        return issueService.getIssueDetail(issueId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body("Issue with ID " + issueId + " not found")
                );
    }

    @Operation(summary = "Delete an issue", description = "Removes an issue permanently from the system.")
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