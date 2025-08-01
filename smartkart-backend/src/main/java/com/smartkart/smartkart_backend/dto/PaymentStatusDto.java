package com.smartkart.smartkart_backend.dto;

import lombok.Data;

@Data
public class PaymentStatusDto {
    private Long orderId;
    private String orderStatus;
}
