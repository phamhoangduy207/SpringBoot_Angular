package com.springbootcrud.api.controller;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springbootcrud.api.model.Greeting;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/")
public class GreetingController {
	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();
	
	private Authentication auth;
	
	/*public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}*/
	
	@RequestMapping("/greeting")
	public String greeting() {
		return "abc";
	}
}
