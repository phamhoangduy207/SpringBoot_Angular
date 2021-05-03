package com.springbootcrud.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springbootcrud.api.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsername(final String username);
}
