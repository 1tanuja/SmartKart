package com.smartkart.smartkart_backend.dto;


import lombok.Data;

import java.util.List;

@Data
public class AdminOrderResponseDto {
    private Long orderId;
    private String orderDate;
    private double totalPrice;
    private String orderStatus;
    private AdminUserDto user;
    private AddressResponseDto address;
    private List<AdminOrderItemsDto> orderItems;
}
