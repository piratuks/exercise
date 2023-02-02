package com.desingRestAPI.restapi.repositories;

import org.springframework.data.repository.CrudRepository;

import com.desingRestAPI.restapi.entities.Status;

public interface StatusRepository extends CrudRepository<Status, String> {

}
