package com.smartkart.smartkart_backend.repository;

import com.smartkart.smartkart_backend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
}
