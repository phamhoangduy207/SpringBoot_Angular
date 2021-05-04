package com.springbootcrud.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long book_id;
	
	private String title;
	
	@Column(name = "author_name")
	private String authorName;
	
	@Column(name = "published_day")
	private String published;
	
	private long price;
	
	@Column(name = "image_url")
	private String imageURL;
	
	@ManyToOne
	@JoinColumn(name = "cat_id", nullable = false)

	private Category category;
}
