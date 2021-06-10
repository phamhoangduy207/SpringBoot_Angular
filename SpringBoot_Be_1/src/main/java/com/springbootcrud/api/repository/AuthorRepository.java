package com.springbootcrud.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootcrud.api.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {
	public Author findByAuthorName(String authorName);
}
