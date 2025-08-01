package com.smartkart.smartkart_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecentOrderDto {
    private Long orderId;
    private Double totalPrice;
    private String orderDate;
    private String orderStatus;

    // Optionally: List of product names or first product name
    private List<String> productNames;
}
