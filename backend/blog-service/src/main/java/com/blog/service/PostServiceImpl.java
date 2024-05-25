package com.blog.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.blog.data.UserRepository;
import com.blog.data.CategorieRepository;
import com.blog.data.PostRepository;
import com.blog.model.pojo.User;
import com.blog.model.pojo.Categorie;
import com.blog.model.pojo.Post;
import com.blog.model.dto.PostCreate;
import com.blog.model.dto.PostEdit;

@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	private PostRepository postRepo;
	
	@Autowired
	private CategorieRepository categorieRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
	
	@Cacheable("firstPageCache")
	private List<Post> getAllPosts() {
		return postRepo.findAll();
	}
	
	@Override
	public Map<String, Object> getPostsFiltered(String keyword, String categorieName, int page, boolean reverse) {
		List<Post> results = new ArrayList<>();
		int nPostsPerPage = 6;
		if (keyword != null) {
			Categorie categorie = categorieRepo.findByName(keyword);
			for (String key : Arrays.asList(keyword.split(","))) {
				results.addAll(postRepo.findByCategoriesContainingAndTitleContainingOrContentContainingIgnoreCase(categorie, key.trim(), key.trim()));
				results.addAll(postRepo.findByTitleContainingOrContentContainingIgnoreCase(key.trim(), key.trim()));	
			}
			results.addAll(postRepo.findByCategoriesContaining(categorie));
		}
		else if (categorieName != null) {
			Categorie categorie = categorieRepo.findByName(categorieName);
			results.addAll(postRepo.findByCategoriesContaining(categorie));
		}
		else {
			results.addAll(getAllPosts());
			if (page == 0) {
				nPostsPerPage = 5;
			} // La pagina principal muestra numero impar porque el primer post es mas grande
		}
		Set<Long> postIds = new HashSet<>();
	    for (Post post : results) {
	        if (!postIds.contains(post.getId())) {
	            postIds.add(post.getId());
	        }
	    }
	    Sort.Direction direction = reverse ? Sort.Direction.ASC: Sort.Direction.DESC;
		Pageable pageable = PageRequest.of(page, nPostsPerPage, Sort.by(direction, "date"));
		Page<Post> pageResult = postRepo.findAllByIdIn(postIds, pageable);
		int totalPages = pageResult.getTotalPages();
		Map<String, Object> response = new HashMap<>();
	    response.put("totalPages", totalPages);
	    response.put("content", pageResult.getContent());
	    return response;
	}

	@Override
	public Post getPostByUri(String postSlug) {
		return postRepo.findBySlug(postSlug);
	}
    
	@Override
	public Post createPost(PostCreate request, String subject) {
		User user = userRepo.findBySub(subject).orElse(null);
		Date date = new Date(System.currentTimeMillis());
		Set<Categorie> categories = new HashSet<Categorie>(categorieRepo.findAllById(request.getCategoryIds()));
		Post post = Post.builder().title(request.getTitle()).slug(request.getSlug()).excerpt(request.getExcerpt()).content(request.getContent()).date(date).featuredImage(request.getFeaturedImage()).featuredPost(request.getFeaturedPost()).categories(categories).users(user).build();
		return postRepo.save(post);
	}
	
	@Override
	public Post editPost(PostEdit request) {
		Optional<Post> postOptional = postRepo.findById(Long.valueOf(request.getPostId()));
		if (postOptional.isEmpty()) {
            return null;
        }
		Post post = postOptional.get();
		if (request.getTitle() != null) {
	        post.setTitle(request.getTitle());
	    }
		if (request.getContent() != null) {
	        post.setContent(request.getContent());
	    }
		if (request.getExcerpt() != null) {
			post.setExcerpt(request.getExcerpt());
		}
		if (request.getFeaturedImage() != null) {
			post.setFeaturedImage(request.getFeaturedImage());
		}
		if (request.getFeaturedPost() != null) {
	        post.setFeaturedPost(request.getFeaturedPost());
	    }
		if (request.getCategoryIds() != null) {
			Set<Categorie> categories = new HashSet<Categorie>(categorieRepo.findAllById(request.getCategoryIds()));
			System.out.println(categories);
			post.setCategories(categories);
		}
		return postRepo.save(post);
	}
	
	@Override
	public boolean deletePost(String postId) {
		if (postRepo.existsById(Long.valueOf(postId))) {
			postRepo.deleteById(Long.valueOf(postId));
			return !postRepo.existsById(Long.valueOf(postId));
		} else {
			return false;
		}
	}

}
