package com.smartkart.smartkart_backend.service;

import com.smartkart.smartkart_backend.dto.UserProductDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserProductService {
    ResponseEntity<byte[]> getImageData(Long id);

    List<UserProductDto> getAllProduct();

    List<UserProductDto> getProductByCat(Long category);

    List<UserProductDto> searchProducts(String query);

    UserProductDto getProductById(Long id);
}
