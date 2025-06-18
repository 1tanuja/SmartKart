package com.smartkart.smartkart_backend.service;

//import com.smartkart.smartkart_backend.model.Image;
import com.smartkart.smartkart_backend.dto.ProductDto;
import com.smartkart.smartkart_backend.model.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

public interface ProductService {

  //  Product addProduct(Product product,Set<Image> images);

    void deleteProduct(Long id);

    List<ProductDto> getAllProduct();


    Product addProduct(Product product, MultipartFile file) throws IOException;

    ResponseEntity<byte[]> getImageData(Long id);

    Product upadateProduct(Long id, Product product, MultipartFile file) throws IOException;


    List<ProductDto> getProductByCategory(Long category);
}
