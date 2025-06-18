package com.smartkart.smartkart_backend.service.serviceImpl;

import com.smartkart.smartkart_backend.dto.ProductDto;
import com.smartkart.smartkart_backend.model.Product;
import com.smartkart.smartkart_backend.repository.ProductRepository;
import com.smartkart.smartkart_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepo;

    @Override
    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    @Override
    public List<ProductDto> getAllProduct() {
        List<Product> product=productRepo.findAll();
        return product.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public Product addProduct(Product product, MultipartFile file) throws IOException {
        product.setImageName(file.getOriginalFilename());
        product.setImageType(file.getContentType());
        product.setImageData(file.getBytes());
        return productRepo.save(product);
    }

    @Override
    public ResponseEntity<byte[]> getImageData(Long id) {
        Product product =productRepo.findById(id).orElseThrow(()-> new RuntimeException("Image Not Found"));
        return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType())).body(product.getImageData());
    }

    @Override
    public Product upadateProduct(Long id, Product updateProduct, MultipartFile file) throws IOException {
        Product exists =productRepo.findById(id).orElseThrow();
        exists.setName(updateProduct.getName());
        exists.setDescription(updateProduct.getDescription());
        exists.setPrice(updateProduct.getPrice());
        exists.setCategory(updateProduct.getCategory());
        exists.setImageName(file.getOriginalFilename());
        exists.setImageType(file.getContentType());
        exists.setImageData(file.getBytes());
        return productRepo.save(exists);
    }

    @Override
    public List<ProductDto> getProductByCategory(Long category) {
        List<Product> product =productRepo.findByCategoryId(category).get();
        return product.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public ProductDto convertToDto(Product product){
        ProductDto dto=new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setCategoryName(product.getCategory().getName());
        dto.setImageUrl("http://localhost:8080/admin/product/image/"+product.getId());
        return dto;
    }

}
