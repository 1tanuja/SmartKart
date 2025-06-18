package com.smartkart.smartkart_backend.service.serviceImpl;

import com.smartkart.smartkart_backend.dto.CategoryDto;
import com.smartkart.smartkart_backend.model.Category;
import com.smartkart.smartkart_backend.repository.CategoryRepository;
import com.smartkart.smartkart_backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepo;
    @Override
    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }

    @Override
    public List<Category> getAllCategory() {
        return categoryRepo.findAll();
    }

    @Override
    public List<CategoryDto> getcategory() {
        return categoryRepo.findAll().stream().map(this::CategoryToDto).collect(Collectors.toList());
    }

    public CategoryDto CategoryToDto(Category category){
        CategoryDto dto=new CategoryDto();
        dto.setId(category.getId());
        dto.setCategoryName(category.getName());
        return dto;
    }
}
