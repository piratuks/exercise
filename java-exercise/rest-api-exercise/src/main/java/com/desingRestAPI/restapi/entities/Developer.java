package com.desingRestAPI.restapi.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Developer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DEVELOPER_ID", updatable = false, nullable = false)
	private Integer developerId;
	@Column(name = "NAME", nullable = false)
	private String name;

	@Override
	public String toString() {
		return "Developer [developerId=" + developerId + ", name=" + name + "]";
	}

	public Integer getDeveloperId() {
		return developerId;
	}

	public void setDeveloperId(Integer developerId) {
		this.developerId = developerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}