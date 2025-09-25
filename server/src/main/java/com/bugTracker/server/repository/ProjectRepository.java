package com.bugTracker.server.repository;

import com.bugTracker.server.model.ProjectModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectModel,String> {
}
