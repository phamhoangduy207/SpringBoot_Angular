package com.springbootcrud.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springbootcrud.api.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
