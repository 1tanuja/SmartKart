package com.smartkart.smartkart_backend.dto;

import lombok.Data;

@Data
public class CartDto {
    public Long id;
    public Long userId;
    public Long productId;
    public int quantity;
}
