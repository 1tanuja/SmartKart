package com.smartkart.smartkart_backend.service;

import com.smartkart.smartkart_backend.dto.CartDto;
import com.smartkart.smartkart_backend.dto.CartResponseDto;
import com.smartkart.smartkart_backend.model.Cart;

import java.util.List;

public interface CartService {
    void addToCart(Long userId, Long productId, int quantity);

    List<CartResponseDto> getCartItem(Long userId);

    void updateCartItem(Long userId, Long productId, int quantity);

    void deleteCartItem(Long cartId);
}
