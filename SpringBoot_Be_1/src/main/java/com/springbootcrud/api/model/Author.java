package com.springbootcrud.api.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "authors")
//@Table(name = "authors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Author {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long author_id;
	
	@Column(name = "author_name")
	private String authorName;
	
	@ManyToMany(mappedBy = "authors", cascade = CascadeType.MERGE)
	@JsonIgnore
	private Set<Book> books;
}
