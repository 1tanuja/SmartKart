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
    private boolean isNewAddress;
    private boolean isFromCart;
    private double totalPrice;
    private String orderStatus;
    private List<OrderProductDto> products;

}
