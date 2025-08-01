package com.smartkart.smartkart_backend.dto;

import lombok.Data;

@Data
public class ProfileResponseDto {
    private String userName;
    private String email;
    private String phoneNumber;
    private String address;
    private String pinCode;
    private RecentOrderDto recentOrders;
}
