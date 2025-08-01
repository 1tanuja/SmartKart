package com.smartkart.smartkart_backend.service;

import com.smartkart.smartkart_backend.dto.*;
import com.smartkart.smartkart_backend.model.UserAddress;

import java.util.List;

public interface OrderService {
    OrderResponseDto placeOrder(PlaceOrderDto placeOrder);

    AddressResponseDto getAddress(Long userId);

    void updateOrderStatus(PaymentStatusDto paymentStatus);

    ProfileResponseDto getProfile(Long userId);

    List<OrderResponseDto> getOrders(Long userId);
}
