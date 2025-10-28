package com.bugTracker.server.repository;

import com.bugTracker.server.dao.IssueModel;
import com.bugTracker.server.projection.IssueSummaryProjection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<IssueModel,String> {
    List<IssueSummaryProjection> findByProjectId(String projectId);
}
