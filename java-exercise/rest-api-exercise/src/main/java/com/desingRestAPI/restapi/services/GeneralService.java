package com.desingRestAPI.restapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desingRestAPI.restapi.entities.Priority;
import com.desingRestAPI.restapi.entities.Status;
import com.desingRestAPI.restapi.entities.Type;
import com.desingRestAPI.restapi.repositories.PriorityRepository;
import com.desingRestAPI.restapi.repositories.StatusRepository;
import com.desingRestAPI.restapi.repositories.TypeRepository;

@Service
public class GeneralService {
	@Autowired
	TypeRepository typeRepository;
	@Autowired
	StatusRepository statusRepository;
	@Autowired
	PriorityRepository priorityRepository;

	public List<Type> getAllTypes() {
		List<Type> types = new ArrayList<Type>();
		typeRepository.findAll().forEach(t -> types.add(t));
		return types;
	}

	public List<Status> getAllStatuses() {
		List<Status> statuses = new ArrayList<Status>();
		statusRepository.findAll().forEach(s -> statuses.add(s));
		return statuses;
	}

	public List<Priority> getAllPriorities() {
		List<Priority> priorities = new ArrayList<Priority>();
		priorityRepository.findAll().forEach(p -> priorities.add(p));
		return priorities;
	}
}
