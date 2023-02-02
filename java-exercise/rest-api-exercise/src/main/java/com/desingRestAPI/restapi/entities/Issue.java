package com.desingRestAPI.restapi.entities;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table
public class Issue {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ISSUE_ID", updatable = false, nullable = false)
	private Integer issueId;
	@Column(name = "TITLE", nullable = false)
	private String title;
	@Column(name = "DESCRIPTION", nullable = false)
	private String description;
	@Column(name = "CREATED_AT", nullable = false)
	private Timestamp createdAt;
	@ManyToOne
	@JoinColumn(name = "DEVELOPER_ID", nullable = true)
	private Developer developer;
	@Column(name = "ESTIMATED_POINT", nullable = true)
	private Integer estimatedPoint;
	@ManyToOne
	@JoinColumn(name = "priority", nullable = true)
	private Priority priorityData;
	@ManyToOne
	@JoinColumn(name = "status")
	private Status statusData;
	@ManyToOne
	@JoinColumn(name = "type")
	private Type typeData;

	@Override
	public String toString() {
		return "Issue [issueId=" + issueId + ", title=" + title + ", description=" + description + ", createdAt="
				+ createdAt + ", developer=" + developer + ", estimatedPoint=" + estimatedPoint + ", priorityData="
				+ priorityData + ", statusData=" + statusData + ", typeData=" + typeData + "]";
	}

	public Integer getIssueId() {
		return issueId;
	}

	public void setIssueId(Integer issueId) {
		this.issueId = issueId;
	}

	public void setEstimatedPoint(Integer estimatedPoint) {
		this.estimatedPoint = estimatedPoint;
	}

	public Integer getEstimatedPoint() {
		return estimatedPoint;
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

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

	public Developer getDeveloper() {
		return developer;
	}

	public void setDeveloper(Developer developer) {
		this.developer = developer;
	}

	public Priority getPriorityData() {
		return priorityData;
	}

	public void setPriorityData(Priority priority) {
		this.priorityData = priority;
	}

	public Status getStatusData() {
		return statusData;
	}

	public void setStatusData(Status status) {
		this.statusData = status;
	}

	public Type getTypeData() {
		return typeData;
	}

	public void setTypeData(Type type) {
		this.typeData = type;
	}
}
