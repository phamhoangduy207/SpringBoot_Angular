package com.springbootcrud.api.controller;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.springbootcrud.api.model.AuthenticationBean;


@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("auth/")
public class LoginController  {
	
	@GetMapping("/login")
	
//	public AuthenticationBean hello() {
//		return new AuthenticationBean("abc");
//	}
	
	public AuthenticationBean hi(HttpSession session) {
		return new AuthenticationBean(session.getId());
	}
}
