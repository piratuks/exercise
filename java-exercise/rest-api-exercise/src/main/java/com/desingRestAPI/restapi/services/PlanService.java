package com.desingRestAPI.restapi.services;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;

import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desingRestAPI.restapi.entities.Developer;
import com.desingRestAPI.restapi.entities.Issue;
import com.desingRestAPI.restapi.model.PlanModel;

@Service
public class PlanService {
	@Autowired
	IssueService issueService;
	@Autowired
	DeveloperService developerService;

	private final int maxWorkDaysPerWeek = 5;
	private final int limit = 10;
	private List<Issue> stories;

	public List<PlanModel> plan() {
		List<Issue> issues = issueService.getAllIssues();
		List<Developer> developers = developerService.getAllDevelopers();
		Predicate<Issue> byType = issue -> issue.getTypeData().getType().equals("Story");
		stories = issues.stream().filter(byType).collect(Collectors.toList());
		stories.sort((o1, o2) -> o2.getEstimatedPoint().compareTo(o1.getEstimatedPoint()));

		int storyPerDev = getAllStoryPoints() / developers.size();
		LocalDate startDate = LocalDate.now();
		LocalDate endDate = getEndDate(startDate);
		long workingDays = calcWeekDays(startDate, endDate);
		int weekCount = storyPerDev / limit + (storyPerDev % limit > 0 ? 1 : 0)
				+ (workingDays < maxWorkDaysPerWeek ? 1 : 0);
		int newLimit = limit;

		List<PlanModel> developerWeekIssue = new ArrayList<PlanModel>();

		for (int k = 0; k < weekCount; k++) {
			for (int i = 0; i <= developers.size() - 1; i++) {
				if (k == 0 && workingDays < maxWorkDaysPerWeek) {
					newLimit = (limit / maxWorkDaysPerWeek) * (int) workingDays;
				} else {
					newLimit = limit;
				}

				developerWeekIssue.add(new PlanModel(startDate, endDate,
						closestToSum(developerWeekIssue, newLimit), developers.get(i)));
		
			}
			startDate = endDate.plusDays(1);
			endDate = getEndDate(startDate);
		}

		
		/*developerWeekIssue.sort((o1, o2) -> o1.getDeveloper().getName().compareTo(o2.getDeveloper().getName()));
		List<Issue> unassignedStories = getUnassignedStories();
		if (unassignedStories.size() > 0) {
			for (int i = 0; i <= developerWeekIssue.size() - 1; i++) {
				for (int k = 0; k <= developerWeekIssue.get(i).getIssues().size() - 1; k++) {
					Issue foundIssue = issueService
							.getIssueById(developerWeekIssue.get(i).getIssues().get(k).getIssueId());
					foundIssue.setDeveloper(developerWeekIssue.get(i).getDeveloper());
					issueService.saveOrUpdate(foundIssue);
				}
			}
		}*/

		// For test purpose

		/*
		 * List<Issue> allStories = getStories(); for(int
		 * i=0;i<=allStories.size()-1;i++){ if(!checkIfContains(developerWeekIssue,
		 * allStories.get(i))) {
		 * System.out.println(allStories.get(i).getTitle()+" "+allStories.get(i).
		 * getEstimatedPoint()); } }
		 */

		/*
		for (int i = 0; i <= developerWeekIssue.size() - 1; i++) {
			System.out.println(developerWeekIssue.get(i).getStartDate() + " " + developerWeekIssue.get(i).getEndDate()
					+ " " + developerWeekIssue.get(i).getIssues().size() + " "
					+ developerWeekIssue.get(i).getDeveloper().getName());
			for (int k = 0; k <= developerWeekIssue.get(i).getIssues().size() - 1; k++) {
				System.out.println(developerWeekIssue.get(i).getIssues().get(k).getTitle() + " "
						+ developerWeekIssue.get(i).getIssues().get(k).getEstimatedPoint());
			}
		}*/

		return developerWeekIssue;
	}

	private int getAllStoryPoints() {
		return getStories().stream().mapToInt(o -> o.getEstimatedPoint()).sum();
	}

	private long calcWeekDays(final LocalDate start, final LocalDate end) {
		final int startW = start.getDayOfWeek().getValue();
		final int endW = end.getDayOfWeek().getValue();

		final long days = ChronoUnit.DAYS.between(start, end);
		long result = days - 2 * (days / 7); // remove weekends

		if (days % 7 != 0) { // deal with the rest days
			if (startW == 7) {
				result -= 1;
			} else if (endW == 7) { // they can't both be Sunday, otherwise rest would be zero
				result -= 1;
			} else if (endW < startW) { // another weekend is included
				result -= 2;
			}
		}

		return result;
	}

	private LocalDate getEndDate(LocalDate endDate) {
		while (endDate.getDayOfWeek() != DayOfWeek.SUNDAY) {
			endDate = endDate.plusDays(1);
		}
		return endDate;
	}

	private List<Issue> getUnassignedStories() {
		Predicate<Issue> byDevs = issue -> {
			return issue.getDeveloper() == null;
		};
		List<Issue> result = stories.stream().filter(byDevs).collect(Collectors.toList());
		return result;
	}

	private List<Issue> getAssignedStories() {
		Predicate<Issue> byDevs = issue -> {
			return issue.getDeveloper() != null;
		};
		List<Issue> result = stories.stream().filter(byDevs).collect(Collectors.toList());
		return result;
	}

	private List<Issue> getStories() {
		List<Issue> assignedStories = getAssignedStories();
		List<Issue> unassignedStories = getUnassignedStories();
		return unassignedStories.size() > 0 ? unassignedStories : assignedStories;
	}

	private boolean checkIfContains(List<PlanModel> developerWeekIssue, Issue issue) {
		int k = developerWeekIssue.size() - 1;
		boolean result = false;
		for (int i = 0; i <= k; i++) {
			List<Issue> weekIssues = developerWeekIssue.get(i).getIssues();
			if (weekIssues.contains(issue)) {
				result = true;
				break;
			}
		}
		return result;
	}

	private Issue findMaxStoryPointIssue(List<PlanModel> developerWeekIssue, List<Issue> toBeAssignedIssues,
			int newLimit, int sum) {
		List<Issue> unassignedStories = getStories();
		Predicate<Issue> byCheckIfContains = issue -> {
			return !checkIfContains(developerWeekIssue, issue) && !toBeAssignedIssues.contains(issue)
					&& (sum == 0 || (newLimit - sum) >= issue.getEstimatedPoint());
		};
		List<Issue> filteredUnassignedStories = unassignedStories.stream().filter(byCheckIfContains)
				.collect(Collectors.toList());

		if (filteredUnassignedStories.size() == 0) {
			return null;
		}

		return filteredUnassignedStories.stream().max(Comparator.comparing(Issue::getEstimatedPoint))
				.orElseThrow(NoSuchElementException::new);
	}

	private List<Issue> closestToSum(List<PlanModel> developerWeekIssue, int newLimit) {
		List<Issue> toBeAssignedIssues = new ArrayList<Issue>();

		int sum = 0;
		while (sum < newLimit) {
			Issue maxStoryPointIssue = findMaxStoryPointIssue(developerWeekIssue, toBeAssignedIssues, newLimit, sum);
			if (maxStoryPointIssue != null) {
				sum += maxStoryPointIssue.getEstimatedPoint();
				toBeAssignedIssues.add(maxStoryPointIssue);
			} else {
				break;
			}

		}

		return toBeAssignedIssues;
	}
}
