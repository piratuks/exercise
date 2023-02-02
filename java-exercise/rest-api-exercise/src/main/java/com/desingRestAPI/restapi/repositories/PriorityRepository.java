package com.desingRestAPI.restapi.repositories;

import org.springframework.data.repository.CrudRepository;

import com.desingRestAPI.restapi.entities.Priority;

public interface PriorityRepository extends CrudRepository<Priority, String> {

}
