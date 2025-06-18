package com.smartkart.smartkart_backend.repository;

import com.smartkart.smartkart_backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
