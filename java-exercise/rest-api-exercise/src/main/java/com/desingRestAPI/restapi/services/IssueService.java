package com.desingRestAPI.restapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desingRestAPI.restapi.entities.Issue;
import com.desingRestAPI.restapi.repositories.IssueRepository;

@Service
public class IssueService {
	@Autowired
	IssueRepository issueRepository;

	public List<Issue> getAllIssues() {
		List<Issue> issues = new ArrayList<Issue>();
		issueRepository.findAll().forEach(issue -> issues.add(issue));
		return issues;
	}

	public Issue getIssueById(int id) {
		return issueRepository.findById(id).get();
	}

	public Issue saveOrUpdate(Issue issue) {
		Issue insertedDev = issueRepository.save(issue);
		return insertedDev;
	}

	public void delete(int id) {
		issueRepository.deleteById(id);
	}
}
