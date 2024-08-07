package com.blog.model.pojo;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Data
@Table(name = "posts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column
	@NotBlank(message = "field title cannot be empty!")
	private String title;
	
	@Column(unique = true) 
	@NotBlank(message = "field slug cannot be empty!")
	private String slug;
	
	@Column(columnDefinition="TEXT")
	@NotBlank(message = "field excerpt cannot be empty!")
	private String excerpt;
	
	@Column(columnDefinition="LONGTEXT")
	//@JsonIgnore
	@NotBlank(message = "field content cannot be empty!")
	private String content;
	
	@Column
	@NotNull(message = "field date cannot be empty!") //NotBlank no se aplica en campo date
	private Date date;
	
	@Column
	//@NotBlank(message = "field featuredImage cannot be empty!")
	private String featuredImage;
	
	@Column
	@JsonIgnore
	@NotNull(message = "field featuredPost cannot be empty!") //NotBlank no se aplica en booleans
	private Boolean featuredPost;
	
	@ManyToMany
	//@JsonIgnore
	@JoinTable(
	  name = "posts_categories", 
	  joinColumns = @JoinColumn(name = "posts_id"), 
	  inverseJoinColumns = @JoinColumn(name = "categories_id")
	 )
	@JsonManagedReference // the one that gets serialized normally
    private Set<Category> categories;
	
	@ManyToMany
	//@JsonIgnore
	@JoinTable(
	  name = "posts_themes", 
	  joinColumns = @JoinColumn(name = "posts_id"), 
	  inverseJoinColumns = @JoinColumn(name = "themes_id")
	 )
	@JsonManagedReference // the one that gets serialized normally
    private Set<Theme> themes;
	
	@ManyToOne
	@JoinColumn(name = "users_id")
	@JsonManagedReference // the one that gets serialized normally
	private User users;
	
	/*
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true) //orpahnremoval y cascadetype, si se elimina el post, desaparece el comentario
	@JsonManagedReference
	private Set<Comment> comments;
	*/
}
