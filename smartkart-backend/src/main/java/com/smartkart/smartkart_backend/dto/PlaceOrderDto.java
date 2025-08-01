package com.smartkart.smartkart_backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class PlaceOrderDto {

    private Long userId;
    private Long addressId;
    private String fullName;
    private String phoneNumber;
    private String fullAddress;
    private String pinCode;
    private boolean newAddress;
    private boolean fromCart;
    private double totalPrice;
    private String orderStatus;
    private List<OrderProductDto> products;

}
