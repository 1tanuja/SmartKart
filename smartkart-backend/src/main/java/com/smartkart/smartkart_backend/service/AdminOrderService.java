package com.smartkart.smartkart_backend.service;

import com.smartkart.smartkart_backend.dto.AdminDashboardSummaryDto;
import com.smartkart.smartkart_backend.dto.AdminOrderResponseDto;

import java.util.List;
import java.util.Map;

public interface AdminOrderService {
    List<AdminOrderResponseDto> getAllOrders();

    void updateOrderStatus(Long orderId, Map<String, String> body);

    AdminDashboardSummaryDto getSummary();

    List<Map<String, Object>> getRecentOrders(int limit);
}
