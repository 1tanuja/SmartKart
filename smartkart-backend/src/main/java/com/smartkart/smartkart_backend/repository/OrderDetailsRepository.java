package com.smartkart.smartkart_backend.repository;

import com.smartkart.smartkart_backend.model.OrderDetails;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails,Long> {
    Optional<OrderDetails> findTopByUserIdOrderByLocalDateDesc(Long userId);

    Optional<List<OrderDetails>> findByUserId(Long userId);

    @Query("SELECT COALESCE(SUM(o.totalPrice), 0) FROM OrderDetails o")
    Double calculateTotalRevenue();

    @Query("SELECT o.id AS orderId, u.name AS customerName, o.totalPrice AS amount, o.orderStatus AS status " +
            "FROM OrderDetails o JOIN o.user u " +
            "ORDER BY o.localDate DESC")
    List<Map<String, Object>> findRecentOrders(Pageable pageable);
}
