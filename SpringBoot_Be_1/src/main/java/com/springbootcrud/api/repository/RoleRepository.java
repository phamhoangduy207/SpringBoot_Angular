package com.springbootcrud.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootcrud.api.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{

}
