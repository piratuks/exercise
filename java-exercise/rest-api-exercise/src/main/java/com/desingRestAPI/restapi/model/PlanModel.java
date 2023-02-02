package com.desingRestAPI.restapi.model;

import java.time.LocalDate;
import java.util.List;

import com.desingRestAPI.restapi.entities.Developer;
import com.desingRestAPI.restapi.entities.Issue;

public class PlanModel {
	public LocalDate startDate;
	public LocalDate endDate;
	public List<Issue> issues;
	public Developer developer;

	public PlanModel(LocalDate startDate, LocalDate endDate, List<Issue> issue, Developer developer) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.issues = issue;
		this.developer = developer;
	}

	@Override
	public String toString() {
		return "PlanModel [startDate=" + startDate + ", endDate=" + endDate + ", issues=" + issues + ", developer="
				+ developer + "]";
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public List<Issue> getIssues() {
		return issues;
	}

	public Developer getDeveloper() {
		return developer;
	}

	public void setStartDate(LocalDate date) {
		this.startDate = date;
	}

	public void setEndDate(LocalDate date) {
		this.endDate = date;
	}

	public void setIssues(List<Issue> issue) {
		this.issues = issue;
	}

	public void setDeveloper(Developer developer) {
		this.developer = developer;
	}
}
