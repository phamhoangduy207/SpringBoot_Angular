package com.springbootcrud.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springbootcrud.api.exception.ResourceNotFoundException;
import com.springbootcrud.api.model.User;
import com.springbootcrud.api.repository.UserRepository;



@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("auth/")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@GetMapping("/users")
	public List<User> getUsers(){
		return this.userRepository.findAll();
	}
	
	@PostMapping("/users")
	public String addUserByAdmin(@RequestBody User user) {
		String pwd = user.getPassword();
		String encrypPwd = passwordEncoder.encode(pwd);
		user.setPassword(encrypPwd);
		userRepository.save(user);
		return "user added successfully!";
	}
	@DeleteMapping("/users/{id}")
	public Map<String, Boolean> deleteUer(@PathVariable(value = "id") Long userid) throws ResourceNotFoundException {
		User user= userRepository.findById(userid)
				.orElseThrow(() -> new ResourceNotFoundException("User not found for this id::" + userid));

		userRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("User deleted", Boolean.TRUE);
		return response;
	}
}
