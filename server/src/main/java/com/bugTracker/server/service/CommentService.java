package com.bugTracker.server.service;

import com.bugTracker.server.dao.CommentModel;
import com.bugTracker.server.dto.comment.CommentDetailDTO;
import com.bugTracker.server.dto.userDetails.UserDTO;
import com.bugTracker.server.repository.CommentRepository;
import com.bugTracker.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public CommentService(CommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    public String addComment(String issueId, String userId, String text) {
        String createdAt = LocalDateTime.now().format(formatter);
        CommentModel comment = new CommentModel(issueId, userId, text, createdAt);
        commentRepository.save(comment);
        return comment.getCommentId();
    }

    public List<CommentDetailDTO> getCommentsByIssue(String issueId) {

        List<CommentModel> comments = commentRepository.findByIssueId(issueId);

        return comments.stream().map(comment -> {

            CommentDetailDTO dto = new CommentDetailDTO();
            dto.setCommentId(comment.getCommentId());
            dto.setIssueId(comment.getIssueId());
            dto.setText(comment.getText());
            dto.setCreatedAt(comment.getCreatedAt());

            if (comment.getUserId() != null) {
                userRepository.findById(comment.getUserId())
                        .ifPresent(user -> {
                            UserDTO userDTO = new UserDTO();
                            userDTO.setUserId(user.getUserId());
                            userDTO.setName(user.getName());
                            userDTO.setEmail(user.getEmail());
                            dto.setAuthor(userDTO);
                        });
            }

            return dto;
        }).toList();
    }

    public Optional<CommentDetailDTO> getCommentDetails(String commentId) {
        Optional<CommentModel> optionalCommentDetail = commentRepository.findById(commentId);
        if (optionalCommentDetail.isEmpty()) return Optional.empty();

        CommentModel comment = optionalCommentDetail.get();

        CommentDetailDTO dto = new CommentDetailDTO();
        dto.setCommentId(commentId);
        dto.setIssueId(comment.getIssueId());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setText(comment.getText());

        if (comment.getUserId() != null) {
            userRepository.findById(comment.getUserId()).ifPresent(user -> {
                UserDTO userDTO = new UserDTO();
                userDTO.setUserId(user.getUserId());
                userDTO.setName(user.getName());
                userDTO.setEmail(user.getEmail());
                dto.setAuthor(userDTO);
            });
        }

        return Optional.of(dto);
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
