package com.smartkart.smartkart_backend.repository;

import com.smartkart.smartkart_backend.model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails,Long> {
}
