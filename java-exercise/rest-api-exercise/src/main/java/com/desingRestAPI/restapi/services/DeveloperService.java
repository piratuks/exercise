package com.desingRestAPI.restapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desingRestAPI.restapi.entities.Developer;
import com.desingRestAPI.restapi.repositories.DeveloperRepository;

@Service
public class DeveloperService {
	@Autowired
	DeveloperRepository developerRepository;

	public List<Developer> getAllDevelopers() {
		List<Developer> developers = new ArrayList<Developer>();
		developerRepository.findAll().forEach(developer -> developers.add(developer));
		return developers;
	}

	public Developer getDeveloperById(int id) {
		return developerRepository.findById(id).get();
	}

	public Developer saveOrUpdate(Developer developer) {
		Developer insertedDev = developerRepository.save(developer);
		return insertedDev;
	}

	public void delete(int id) {
		developerRepository.deleteById(id);
	}
}