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

import com.springbootcrud.api.exception.ResourceNotFoundException;
import com.springbootcrud.api.model.Author;
import com.springbootcrud.api.repository.AuthorRepository;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("api/")
public class AuthorController {
	@Autowired
	private AuthorRepository authorRepository;

	@GetMapping("/authors")
	public List<Author> getAuthors() {
		return this.authorRepository.findAll();
	}

	@GetMapping("/authors/{id}")
	public ResponseEntity<Author> getAuthorById(@PathVariable(value = "id") Long authorid)
			throws ResourceNotFoundException {
		Author author = authorRepository.findById(authorid)
				.orElseThrow(() -> new ResourceNotFoundException("Author not found for this id: " + authorid));
		return ResponseEntity.ok().body(author);
	}

	@PostMapping("/authors")
	public Author addAuthor(@Validated @RequestBody Author author) {
		return authorRepository.save(author);
	}

	@PutMapping("/authors/{id}")
	public ResponseEntity<Author> updateAuthor(@PathVariable(value = "id") Long authorid,
			@Validated @RequestBody Author authorDetails) throws ResourceNotFoundException {
		Author author = authorRepository.findById(authorid)
				.orElseThrow(() -> new ResourceNotFoundException("Author not found for this id: " + authorid));

		author.setAuthorName(authorDetails.getAuthorName());

		final Author updatedAuthor = authorRepository.save(author);
		return ResponseEntity.ok(updatedAuthor);
	}

	@DeleteMapping("/authors/{id}")
	public Map<String, Boolean> deleteAuthor(@PathVariable(value = "id") Long authorid) throws ResourceNotFoundException {
		Author author = authorRepository.findById(authorid)
				.orElseThrow(() -> new ResourceNotFoundException("Author not found for this id: " + authorid));

		authorRepository.delete(author);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted", Boolean.TRUE);
		return response;
	}
}
