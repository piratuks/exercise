package com.desingRestAPI.restapi.repositories;

import org.springframework.data.repository.CrudRepository;

import com.desingRestAPI.restapi.entities.Issue;

public interface IssueRepository extends CrudRepository<Issue, Integer> {

}
