package com.bugTracker.server.repository;

import com.bugTracker.server.dao.CommentModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentModel, String> {
    List<CommentModel> findByIssueId(String issueId);
}
