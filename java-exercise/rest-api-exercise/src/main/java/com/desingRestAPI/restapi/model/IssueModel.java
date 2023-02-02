package com.desingRestAPI.restapi.model;

public class IssueModel {
	public Integer issueId;
	public String title;
	public String description;
	public Integer developerID;
	public Integer estimatedPoint;
	public String priority;
	public String status;
	public String type;

	public Integer getIssueId() {
		return issueId;
	}

	public void setIssueId(Integer issueId) {
		this.issueId = issueId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getDeveloperID() {
		return developerID;
	}

	public void setDeveloperID(Integer developerID) {
		this.developerID = developerID;
	}

	public Integer getEstimatedPoint() {
		return estimatedPoint;
	}

	public void setEstimatedPoint(Integer estimatedPoint) {
		this.estimatedPoint = estimatedPoint;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "IssueModel [issueId=" + issueId + ", title=" + title + ", description=" + description + ", developerID="
				+ developerID + ", estimatedPoint=" + estimatedPoint + ", priority=" + priority + ", status=" + status
				+ ", type=" + type + "]";
	}

}
