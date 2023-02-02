package com.desingRestAPI.restapi.controllers;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

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

import com.desingRestAPI.restapi.entities.Developer;
import com.desingRestAPI.restapi.entities.Issue;
import com.desingRestAPI.restapi.services.DeveloperService;
import com.desingRestAPI.restapi.services.IssueService;

@RestController
@RequestMapping("/api")
public class DeveloperController {

	@Override
	public String toString() {
		return "DeveloperController [developerService=" + developerService + ", issueService=" + issueService + "]";
	}

	@Autowired
	DeveloperService developerService;
	@Autowired
	IssueService issueService;

	@GetMapping("/developers")
	private List<Developer> getAllDevelopers() {
		return developerService.getAllDevelopers();
	}

	@DeleteMapping("/developer/{id}")
	private void removeDeveloper(@PathVariable("id") int id) {
		Predicate<Issue> byDevs = issue -> {
			return issue.getDeveloper() != null && issue.getDeveloper().getDeveloperId().equals(id);
		};
		List<Issue> result = issueService.getAllIssues().stream().filter(byDevs).collect(Collectors.toList());

		if (result.size() > 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Developer is assigned to issues");
		}
		developerService.delete(id);
	}

	@PostMapping("/developer")
	private Developer saveDeveloper(@RequestBody Developer developer) {
		if (developer.getName() == null) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Developer name cannot be empty");
		}
		Developer insertedDev = developerService.saveOrUpdate(developer);
		return insertedDev;
	}
}
