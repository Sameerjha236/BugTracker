package com.bugTracker.server.controllers;

import com.bugTracker.server.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> addComment(@RequestBody Map<String, String> request) {
        String issueId = request.get("issueId");
        String userId = request.get("userId");
        String text = request.get("text");

        String commentId = commentService.addComment(issueId, userId, text);
        return ResponseEntity.ok("Comment added with ID: " + commentId);
    }

    @GetMapping("/issue/{issueId}")
    public ResponseEntity<?> getCommentsByIssue(@PathVariable String issueId) {
        return ResponseEntity.ok(commentService.getCommentsByIssue(issueId));
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<?> getComment(@PathVariable String commentId) {
        return commentService.getComment(commentId)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Comment with ID " + commentId + " not found"));
    }

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
