package com.smartkart.smartkart_backend.controller;

import com.smartkart.smartkart_backend.dto.UserProductDto;
import com.smartkart.smartkart_backend.service.UserProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/product")
@CrossOrigin(origins = "http://localhost:4200")
public class UserProductController {

    @Autowired
    private UserProductService userProductService;

    @GetMapping("/allProduct")
    public ResponseEntity<List<UserProductDto>> getAllProducts(){
      return ResponseEntity.ok(userProductService.getAllProduct());
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<byte[]> getImageData(@PathVariable Long id){
        return userProductService.getImageData(id);
    }

    @GetMapping("/productByCat")
    public ResponseEntity<List<UserProductDto>> getProductsByCat(@RequestParam("category") Long category){
        return ResponseEntity.ok(userProductService.getProductByCat(category));
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserProductDto>> searchProduct(@RequestParam("query") String query){
        return ResponseEntity.ok(userProductService.searchProducts(query));
    }

    @GetMapping("/getProductById/{id}")
    public ResponseEntity<UserProductDto> getProductById(@PathVariable Long id){
        return ResponseEntity.ok(userProductService.getProductById(id));
    }


}
