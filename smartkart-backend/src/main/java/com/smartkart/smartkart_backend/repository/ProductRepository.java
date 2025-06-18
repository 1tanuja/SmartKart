package com.smartkart.smartkart_backend.repository;

import com.smartkart.smartkart_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> getByCategoryId(Long category);
    Optional<List<Product>> findByCategoryId(Long category);
}
