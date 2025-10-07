package com.bugTracker.server.repository;

import com.bugTracker.server.dao.IssueModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<IssueModel,String> {
}
