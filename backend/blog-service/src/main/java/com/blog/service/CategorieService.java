package com.blog.service;

import java.util.List;
import java.util.Map;

import com.blog.model.pojo.Categorie;
import com.blog.model.dto.categorie.CategorieCreate;
import com.blog.model.dto.categorie.CategorieEdit;

public interface CategorieService {
	List<Categorie> getAllCategories();
	Map<String, Object> getAllCategoriesPageable(int page, Integer perpage);
	Categorie getCategorieByName(String categorieName);
	Categorie createCategorie(CategorieCreate request);
	Categorie editCategorie(CategorieEdit request);
	boolean deleteCategorie(String categorieId);
}
