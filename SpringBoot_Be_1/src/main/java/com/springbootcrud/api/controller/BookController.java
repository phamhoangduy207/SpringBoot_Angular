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
import com.springbootcrud.api.model.Book;
import com.springbootcrud.api.repository.BookRepository;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("api/")
@JsonIgnoreProperties("category")
public class BookController {

	@Autowired
	private BookRepository bookRepository;

	@GetMapping("/books")
	public List<Book> getBooks() {
		return this.bookRepository.findAll();
	}

	@GetMapping("/books/{id}")
	public ResponseEntity<Book> getBookById(@PathVariable(value = "id") Long bookid) throws ResourceNotFoundException {
		Book book = bookRepository.findById(bookid)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found for this id : " + bookid));
		return ResponseEntity.ok().body(book);

	}

	@PostMapping("/books")
	public Book addBook(@Validated @RequestBody Book book) {
		return bookRepository.save(book);
	}

	@PutMapping("/books/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable(value = "id") Long bookid,
			@Validated @RequestBody Book bookDetails) throws ResourceNotFoundException {
		Book book = bookRepository.findById(bookid)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found for this id:: " + bookid));

		book.setTitle(bookDetails.getTitle());
		book.setCategory(bookDetails.getCategory());
		book.setAuthorName(bookDetails.getAuthorName());
		book.setPublished(bookDetails.getPublished());
		book.setPrice(bookDetails.getPrice());

		final Book updatedBook = bookRepository.save(book);
		return ResponseEntity.ok(updatedBook);
	}

	@DeleteMapping("/books/{id}")
	public Map<String, Boolean> deleteBook(@PathVariable(value = "id") Long bookid) throws ResourceNotFoundException {
		Book book = bookRepository.findById(bookid)
				.orElseThrow(() -> new ResourceNotFoundException("Book not found for this id::" + bookid));

		bookRepository.delete(book);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted", Boolean.TRUE);
		return response;
	}
}
