package com.smartkart.smartkart_backend.dto;

import lombok.Data;

@Data
public class OrderItemResponseDto {
    private String productName;
    private int quantity;
    private double unitPrice;
}
