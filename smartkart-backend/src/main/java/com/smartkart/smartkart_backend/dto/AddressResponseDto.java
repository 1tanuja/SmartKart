package com.smartkart.smartkart_backend.dto;

import lombok.Data;

@Data
public class AddressResponseDto {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String fullAddress;
    private String pinCode;
}
