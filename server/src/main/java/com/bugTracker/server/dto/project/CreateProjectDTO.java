package com.bugTracker.server.dto.project;

public class CreateProjectDTO {
    String name;
    String description;
    String owner;

    public CreateProjectDTO(String name, String description, String createdBy) {
        this.name = name;
        this.description = description;
        this.owner = createdBy;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}
