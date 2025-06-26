package com.smartkart.smartkart_backend.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class OrderResponseDto {
    private Long orderId;
    private LocalDate orderDate;
    private double totalPrice;
    private String orderStatus;
    private String deliveryAddress;
    private List<OrderItemResponseDto> items;
}
