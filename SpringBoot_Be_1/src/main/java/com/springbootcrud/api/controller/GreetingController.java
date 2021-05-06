package com.springbootcrud.api.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springbootcrud.api.model.CustomUserDetails;
import com.springbootcrud.api.model.Greeting;



@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("api/")
public class GreetingController {

	@GetMapping("/greeting")
	public Greeting greeting(Authentication auth) {
		CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
		return new Greeting(user.getFullName(), user.getImageUrl());
	}
	
}
