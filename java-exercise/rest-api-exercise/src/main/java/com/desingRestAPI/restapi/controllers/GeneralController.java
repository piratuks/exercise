package com.desingRestAPI.restapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desingRestAPI.restapi.entities.Status;
import com.desingRestAPI.restapi.entities.Priority;
import com.desingRestAPI.restapi.entities.Type;
import com.desingRestAPI.restapi.services.GeneralService;

@RestController
@RequestMapping("/api")
public class GeneralController {
	@Autowired
	GeneralService generalService;

	@GetMapping("/priorities")
	private List<Priority> getAllPriorities() {
		return generalService.getAllPriorities();
	}

	@GetMapping("/statuses")
	private List<Status> getAllStatuses() {
		return generalService.getAllStatuses();
	}

	@GetMapping("/types")
	private List<Type> getAllTypes() {
		return generalService.getAllTypes();
	}
}
