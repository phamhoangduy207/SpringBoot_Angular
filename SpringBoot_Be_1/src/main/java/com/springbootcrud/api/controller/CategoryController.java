package com.springbootcrud.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springbootcrud.api.exception.ResourceNotFoundException;
import com.springbootcrud.api.model.Category;
import com.springbootcrud.api.repository.CategoryRepository;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("api/")
public class CategoryController {
	@Autowired
	private CategoryRepository catRepo;

	@GetMapping("/categories")
	public List<Category> getCats() {
		return this.catRepo.findAll();
	}

	@GetMapping("/categories/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable(value = "id") Long catid)
			throws ResourceNotFoundException {
		Category cat = catRepo.findById(catid)
				.orElseThrow(() -> new ResourceNotFoundException("Category not found for this id: " + catid));
		return ResponseEntity.ok().body(cat);
	}

	@PostMapping("/categories")
	public Category addCat(@Validated @RequestBody Category cat) {
		return catRepo.save(cat);
	}

	@PutMapping("/categories/{id}")
	public ResponseEntity<Category> updateCat(@PathVariable(value = "id") Long catid,
			@Validated @RequestBody Category catDetails) throws ResourceNotFoundException {
		Category cat = catRepo.findById(catid)
				.orElseThrow(() -> new ResourceNotFoundException("Category not found for this id: " + catid));

		cat.setDescription(catDetails.getDescription());

		final Category updatedCat = catRepo.save(cat);
		return ResponseEntity.ok(updatedCat);
	}

	@DeleteMapping("/categories/{id}")
	public Map<String, Boolean> deleteCat(@PathVariable(value = "id") Long catid) throws ResourceNotFoundException {
		Category cat = catRepo.findById(catid)
				.orElseThrow(() -> new ResourceNotFoundException("Category not found for this id: " + catid));

		catRepo.delete(cat);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted", Boolean.TRUE);
		return response;
	}
}
