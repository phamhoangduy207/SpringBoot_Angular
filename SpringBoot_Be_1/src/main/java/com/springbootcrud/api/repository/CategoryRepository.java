package com.springbootcrud.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.springbootcrud.api.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
//	@Query(value = "SELECT * FROM categories as c JOIN books as b ON c.cat_id = b.cat_id WHERE b.book_id = :bookId", nativeQuery = true)
//	Category findByCurrentBook(@Param("bookId") Long bookId);
}
