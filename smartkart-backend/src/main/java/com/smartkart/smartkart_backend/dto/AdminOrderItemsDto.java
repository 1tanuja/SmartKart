package com.smartkart.smartkart_backend.dto;

import lombok.Data;

@Data
public class AdminOrderItemsDto {
    private Long productId;
    private String productName;
    private int quantity;
    private double price;
    private String productImage;
}
