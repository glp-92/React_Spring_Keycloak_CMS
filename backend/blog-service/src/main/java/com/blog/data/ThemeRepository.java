package com.blog.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.model.pojo.Theme;


public interface ThemeRepository extends JpaRepository<Theme, Long> {
	Theme findByName(String name);
	List<Theme> findAllById(Iterable<Long> ids);
}
