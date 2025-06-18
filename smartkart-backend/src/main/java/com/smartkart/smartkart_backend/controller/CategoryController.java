package com.smartkart.smartkart_backend.controller;

import com.smartkart.smartkart_backend.dto.CategoryDto;
import com.smartkart.smartkart_backend.model.Category;
import com.smartkart.smartkart_backend.service.CategoryService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin/category")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/addCategory")
    public Category addCategory(@RequestBody Category category){
        return categoryService.addCategory(category);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategory(){
       return ResponseEntity.ok(categoryService.getAllCategory());
    }

    @GetMapping("/allCat")
    public ResponseEntity<List<CategoryDto>> getCategories(){
        return ResponseEntity.ok(categoryService.getcategory());
    }
}
