package com.blog.data;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.blog.model.pojo.Categorie;


public interface CategorieRepository extends JpaRepository<Categorie, Long> {
	Categorie findByName(String name);
	List<Categorie> findAllById(Iterable<Long> ids);
	
	@Query(
	    value = "select c from Categorie c left join c.posts p group by c Order By count(p) desc",
	    countQuery = "select count(c) from Categorie c"
    )
    Page<Categorie> findAllOrderByAddressCountDesc(Pageable pageable);
}
