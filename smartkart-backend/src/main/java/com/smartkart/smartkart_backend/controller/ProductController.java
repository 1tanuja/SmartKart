package com.smartkart.smartkart_backend.controller;


import com.smartkart.smartkart_backend.dto.ProductDto;
import com.smartkart.smartkart_backend.model.Product;
import com.smartkart.smartkart_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin/product")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping(value = "/addProduct",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product addProduct(@RequestPart("product") Product product, @RequestPart("image")MultipartFile file){
        try {
            return productService.addProduct(product,file);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping(value = "/update/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestPart("product") Product product, @RequestPart("image")MultipartFile file) throws IOException {
        return ResponseEntity.ok(productService.upadateProduct(id,product,file));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product Deleted Successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> getAllProduct(){
        return ResponseEntity.ok(productService.getAllProduct());
    }

    @GetMapping("image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id){
        return productService.getImageData(id);
    }

    @GetMapping("/ProductByCategory")
    public ResponseEntity<List<ProductDto>> getProducts(@RequestParam("category") Long category) {
        return ResponseEntity.ok(productService.getProductByCategory(category));
    }

}
