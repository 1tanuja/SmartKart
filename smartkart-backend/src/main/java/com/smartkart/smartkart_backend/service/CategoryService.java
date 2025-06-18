package com.smartkart.smartkart_backend.service;

import com.smartkart.smartkart_backend.dto.CategoryDto;
import com.smartkart.smartkart_backend.model.Category;

import java.util.List;

public interface CategoryService {
    Category addCategory(Category category);

    List<Category> getAllCategory();

    List<CategoryDto> getcategory();
}
