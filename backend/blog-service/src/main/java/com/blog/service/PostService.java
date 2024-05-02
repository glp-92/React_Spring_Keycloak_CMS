package com.blog.service;

import java.util.Map;

import com.blog.model.pojo.Post;
import com.blog.model.dto.PostCreate;
import com.blog.model.dto.PostEdit;

public interface PostService {
	Map<String, Object> getPostsFiltered(String keyword, String categorie, int page, boolean reverse);
	Post getPostByUri(String postSlug);
	Post createPost(PostCreate request, String subject); //Al devolver directamente el contenido del post te puede redirigir a la pagina
	//List<String> uploadImages(List<MultipartFile> imageList, List<String> imagenameList) throws IllegalStateException, IOException;
	Post editPost(PostEdit request);
	boolean deletePost(String postId);
}
