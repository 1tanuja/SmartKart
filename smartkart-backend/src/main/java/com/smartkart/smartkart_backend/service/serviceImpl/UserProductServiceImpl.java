package com.smartkart.smartkart_backend.service.serviceImpl;

import com.smartkart.smartkart_backend.dto.UserProductDto;
import com.smartkart.smartkart_backend.model.Product;
import com.smartkart.smartkart_backend.repository.ProductRepository;
import com.smartkart.smartkart_backend.service.UserProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserProductServiceImpl implements UserProductService {

    @Autowired
    private ProductRepository productRepo;

    @Override
    public ResponseEntity<byte[]> getImageData(Long id) {
        Product product=productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType())).body(product.getImageData());
    }

    @Override
    public List<UserProductDto> getAllProduct() {
        List<Product> products=productRepo.findAll();
        return products.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<UserProductDto> getProductByCat(Long category) {
        List<Product> products =productRepo.findByCategoryId(category).get();
        return products.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<UserProductDto> searchProducts(String query) {
        List<Product> products=productRepo.searchByName(query);
        return products.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public UserProductDto mapToDto(Product product){
        UserProductDto dto=new UserProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setOriginalPrice(product.getPrice());
        dto.setCategoryName(product.getCategory().getName());
        dto.setImageUrl("http://localhost:8080/user/product/images/"+product.getId());

        //Set Discount & Offer price
        double discountPercent=getDiscountByCategory(product.getCategory().getName());
        double offerPrice=product.getPrice() * (1 - discountPercent / 100 );

        dto.setOfferPrice(Math.round(offerPrice * 100.0) / 100.0);
        dto.setDiscountPercent(discountPercent);

        return dto;
    }

    public double getDiscountByCategory(String category){
        return switch (category.toLowerCase()) {
            case "mobiles" -> 25.0;
            case "electronics" -> 15.0;
            case "fashion" -> 10.0;
            default -> 5.0;
        };
    }
}
