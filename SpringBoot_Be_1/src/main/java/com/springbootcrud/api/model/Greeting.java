package com.springbootcrud.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Greeting {
	private final String fullName;
	private final String imageURL;
}
