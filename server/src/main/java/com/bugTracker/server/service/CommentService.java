package com.bugTracker.server.service;

import com.bugTracker.server.dao.CommentModel;
import com.bugTracker.server.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public String addComment(String issueId, String userId, String text) {
        String createdAt = LocalDateTime.now().format(formatter);
        CommentModel comment = new CommentModel(issueId, userId, text, createdAt);
        commentRepository.save(comment);
        return comment.getCommentId();
    }

    public List<CommentModel> getCommentsByIssue(String issueId) {
        return commentRepository.findByIssueId(issueId);
    }

    public Optional<CommentModel> getComment(String commentId) {
        return commentRepository.findById(commentId);
    }

    public boolean updateComment(String commentId, Map<String, Object> updates) {
        Optional<CommentModel> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) return false;

        CommentModel comment = optionalComment.get();
        if (updates.containsKey("text")) {
            comment.setText((String) updates.get("text"));
        }
        commentRepository.save(comment);
        return true;
    }

    public boolean deleteComment(String commentId) {
        if (!commentRepository.existsById(commentId)) return false;
        commentRepository.deleteById(commentId);
        return true;
    }
}
