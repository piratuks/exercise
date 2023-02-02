package com.desingRestAPI.restapi.repositories;

import org.springframework.data.repository.CrudRepository;

import com.desingRestAPI.restapi.entities.Developer;

public interface DeveloperRepository extends CrudRepository<Developer, Integer> {
}