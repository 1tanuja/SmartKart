package com.smartkart.smartkart_backend.controller;

import com.smartkart.smartkart_backend.dto.AdminDashboardSummaryDto;
import com.smartkart.smartkart_backend.dto.AdminOrderResponseDto;
import com.smartkart.smartkart_backend.service.AdminOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/order")
public class AdminOrderController {

    @Autowired
    private AdminOrderService adminOrderService;

    @GetMapping("/getAll")
    public ResponseEntity<List<AdminOrderResponseDto>> getAllOrders(){
        return ResponseEntity.ok(adminOrderService.getAllOrders());
    }

    @PutMapping("/statusUpdate/{orderId}")
    public ResponseEntity<?> updateOrderStatusByAdmin(@PathVariable Long orderId, @RequestBody Map<String, String> body){
        adminOrderService.updateOrderStatus(orderId,body);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getSummary")
    public ResponseEntity<AdminDashboardSummaryDto> getDashboardSummary(){
        return ResponseEntity.ok(adminOrderService.getSummary());
    }

    @GetMapping("/recentOrders")
    public ResponseEntity<List<Map<String, Object>>> getRecentOrders(){
        List<Map<String, Object>> recentOrders=adminOrderService.getRecentOrders(3);
        return ResponseEntity.ok(recentOrders);
    }


}
