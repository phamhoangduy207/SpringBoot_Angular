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
public class LoginController {

	@GetMapping("/login")
	public AuthenticationBean hi(HttpSession session) {
		return new AuthenticationBean(session.getId());
	}

//	@PostMapping("/logout")
//	public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response){
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		if(auth != null) {
//			new SecurityContextLogoutHandler().logout(request, response, auth);
//		}	
//	    return new ResponseEntity<String>("Logout Successfully!", HttpStatus.OK);
//	}

//	@GetMapping(value="/logout")
//	public ExecutionStatus logout (HttpServletRequest request, HttpServletResponse response) {
//	  Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//	  if (auth != null){
//	    new SecurityContextLogoutHandler().logout(request, response, auth);
//	  }
//	  return new ExecutionStatus("USER_LOGOUT_SUCCESSFUL", "User is logged out");
//	}
}
