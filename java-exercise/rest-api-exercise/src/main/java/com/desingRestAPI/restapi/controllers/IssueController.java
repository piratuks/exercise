package com.desingRestAPI.restapi.controllers;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.RequestBody;

import com.desingRestAPI.restapi.entities.Type;
import com.desingRestAPI.restapi.entities.Developer;
import com.desingRestAPI.restapi.entities.Issue;
import com.desingRestAPI.restapi.entities.Priority;
import com.desingRestAPI.restapi.entities.Status;
import com.desingRestAPI.restapi.model.IssueModel;
import com.desingRestAPI.restapi.model.PlanModel;
import com.desingRestAPI.restapi.services.DeveloperService;
import com.desingRestAPI.restapi.services.IssueService;
import com.desingRestAPI.restapi.services.PlanService;

@RestController
@RequestMapping("/api")
public class IssueController {
	@Autowired
	IssueService issueService;
	@Autowired
	DeveloperService developerService;
	@Autowired
	PlanService planService;

	@GetMapping("/issues")
	private List<Issue> getAllIssues() {
		return issueService.getAllIssues();
	}

	@DeleteMapping("/issue/{id}")
	private void removeIssue(@PathVariable("id") int id) {
		issueService.delete(id);
	}

	@PostMapping("/issue")
	private Issue saveDeveloper(@RequestBody IssueModel issue) {
		Issue tempIssue = new Issue();
		Priority p = new Priority();
		if (issue.priority != null) {
			p.setPriority(issue.priority);
			tempIssue.setPriorityData(p);
		}
		Status s = new Status();
		if (issue.status != null) {
			s.setStatus(issue.status);
			tempIssue.setStatusData(s);
		}
		Type t = new Type();
		if (issue.type != null) {
			t.setType(issue.type);
			tempIssue.setTypeData(t);
		}
		Developer dev = new Developer();
		if (issue.developerID != null) {
			dev = developerService.getDeveloperById(issue.developerID);
			tempIssue.setDeveloper(dev);
		}
		
		tempIssue.setCreatedAt(Timestamp.from(Instant.now()));
		tempIssue.setDescription(issue.description);
		tempIssue.setEstimatedPoint(issue.estimatedPoint);
		tempIssue.setIssueId(issue.issueId);
		tempIssue.setTitle(issue.title);		
		
		boolean isPointsEmpty = tempIssue.getEstimatedPoint() == null;
		boolean isPriorityEmpty = tempIssue.getPriorityData() == null || tempIssue.getPriorityData().getPriority() == null
				|| tempIssue.getPriorityData().getPriority().trim().length() == 0;
		if (tempIssue.getTitle() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Issue title cannot be empty");
		} else if (tempIssue.getDescription() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Issue description cannot be empty");
		} else if (tempIssue.getTypeData() == null || tempIssue.getTypeData().getType() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Issue type cannot be empty");
		} else if (tempIssue.getTypeData() != null && tempIssue.getTypeData().getType().equals("Bug")) {
			ArrayList<String> allowedStatuses = new ArrayList<>(Arrays.asList("New", "Verified", "Resolved"));
			if (isPriorityEmpty) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bugs needs priority");
			} else if (!isPointsEmpty) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bugs do not have estimated points");
			} else if (tempIssue.getStatusData() == null || !allowedStatuses.contains(tempIssue.getStatusData().getStatus())) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bugs statuses are New/Verified/Resolved");
			}
		} else if (tempIssue.getTypeData() != null && tempIssue.getTypeData().getType().equals("Story")) {
			ArrayList<String> allowedStatuses = new ArrayList<>(Arrays.asList("New", "Estimated", "Completed"));
			if (!isPriorityEmpty) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Story do not have priority");
			} else if (isPointsEmpty) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Story needs estimated points");
			} else if (tempIssue.getStatusData() == null || !allowedStatuses.contains(tempIssue.getStatusData().getStatus())) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Story statuses are New/Estimated/Completed");
			}
		} else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Issue is either Story or Bug");
		}

		Issue insertedIssue = issueService.saveOrUpdate(tempIssue);
		return insertedIssue;
	}

	@GetMapping("/plan")
	private List<PlanModel> plan() {
		return planService.plan();
	}

}
