package com.smartkart.smartkart_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDto {

    private Long cartId;
    private Long productId;
    private String productName;
    private double originalPrice;
    private double offerPrice;
    private double discountPercent;
    private String categoryName;
    private String imageUrl;
    private int quantity;
}
