package com.bugTracker.server.repository;

import com.bugTracker.server.dao.ProjectModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectModel,String> {
}
