package com.springbootcrud.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.springbootcrud.api.model.CustomUserDetails;
import com.springbootcrud.api.model.User;
import com.springbootcrud.api.repository.UserRepository;



@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		CustomUserDetails userDetails = null;
		if(user!=null) {
			userDetails = new CustomUserDetails();
			userDetails.setUser(user);
		}else {
			throw new UsernameNotFoundException("User not found with the name: " + username);
		}
		return userDetails;
	}
}
