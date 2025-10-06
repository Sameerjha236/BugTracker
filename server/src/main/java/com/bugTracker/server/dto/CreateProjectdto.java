package com.bugTracker.server.dto;

public class CreateProjectdto {
    String name;
    String description;
    String owner;

    public CreateProjectdto(String name, String description, String createdBy) {
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
