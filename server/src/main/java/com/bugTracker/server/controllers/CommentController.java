package com.bugTracker.server.controllers;

import com.bugTracker.server.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/comment")
@Tag(name = "Comment Controller", description = "Endpoints for creating, retrieving, updating, and deleting issue comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @Operation(
            summary = "Create a new comment",
            description = "Adds a comment to a specific issue. Requires issueId, userId, and commentText.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = @Content(examples = @ExampleObject(
                            value = "{ \"issueId\": \"ISSUE-123\", \"userId\": \"USER-456\", \"commentText\": \"This is a sample comment\" }"
                    ))
            )
    )
    @PostMapping("/create")
    public ResponseEntity<String> addComment(@RequestBody Map<String, String> request) {
        String issueId = request.get("issueId");
        String userId = request.get("userId");
        String text = request.get("commentText");
        String commentId = commentService.addComment(issueId, userId, text);
        return ResponseEntity.ok("Comment added with ID: " + commentId);
    }

    @Operation(summary = "Get all comments for an issue", description = "Returns a list of comments associated with the given issue ID.")
    @GetMapping("/issue/{issueId}")
    public ResponseEntity<?> getCommentsByIssue(@PathVariable String issueId) {
        return ResponseEntity.ok(commentService.getCommentsByIssue(issueId));
    }

    @Operation(summary = "Get specific comment details")
    @ApiResponse(responseCode = "200", description = "Comment found")
    @ApiResponse(responseCode = "404", description = "Comment not found")
    @GetMapping("/{commentId}")
    public ResponseEntity<?> getComment(@PathVariable String commentId) {
        return commentService.getCommentDetails(commentId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Comment with ID " + commentId + " not found"));
    }

    @Operation(
            summary = "Partially update a comment",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = @Content(examples = @ExampleObject(
                            value = "{ \"commentText\": \"Updated text content\" }"
                    ))
            )
    )
    @PatchMapping("/update/{commentId}")
    public ResponseEntity<String> updateComment(
            @PathVariable String commentId,
            @RequestBody Map<String, Object> updates) {

        boolean updated = commentService.updateComment(commentId, updates);
        if (updated)
            return ResponseEntity.ok("Comment updated successfully");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Comment with ID " + commentId + " not found");
    }

    @Operation(summary = "Delete a comment")
    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable String commentId) {
        boolean deleted = commentService.deleteComment(commentId);
        if (deleted)
            return ResponseEntity.ok("Comment deleted successfully");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Comment with ID " + commentId + " not found");
    }
}