package com.smartkart.smartkart_backend.controller;

import com.smartkart.smartkart_backend.dto.*;
import com.smartkart.smartkart_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<OrderResponseDto> placeOrder(@RequestBody PlaceOrderDto placeOrder){
        return ResponseEntity.ok(orderService.placeOrder(placeOrder));
    }

    @GetMapping("/getAddress/{userId}")
    public ResponseEntity<AddressResponseDto> getOrderAddress(@PathVariable Long userId){
        AddressResponseDto addressResponse=orderService.getAddress(userId);
        if(addressResponse == null){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(addressResponse);
    }

    @PutMapping("/updateStatus")
    public ResponseEntity<?> updateOrderStatus(@RequestBody PaymentStatusDto paymentStatus){
        orderService.updateOrderStatus(paymentStatus);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getProfile/{userId}")
    public ResponseEntity<ProfileResponseDto> getProfile(@PathVariable Long userId){
        return ResponseEntity.ok(orderService.getProfile(userId));
    }

    @GetMapping("/getOrders/{userId}")
    public ResponseEntity<List<OrderResponseDto>> getOrderDetails(@PathVariable Long userId){
        return ResponseEntity.ok(orderService.getOrders(userId));
    }

}
