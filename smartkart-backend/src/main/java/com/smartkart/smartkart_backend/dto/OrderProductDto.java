package com.smartkart.smartkart_backend.dto;

import lombok.Data;

@Data
public class OrderProductDto {
    private Long productId;
    private int quantity;
    private double unitPrice;
}
