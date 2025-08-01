package com.smartkart.smartkart_backend.service.serviceImpl;

import com.smartkart.smartkart_backend.dto.*;
import com.smartkart.smartkart_backend.model.OrderDetails;
import com.smartkart.smartkart_backend.model.Product;
import com.smartkart.smartkart_backend.model.User;
import com.smartkart.smartkart_backend.model.UserAddress;
import com.smartkart.smartkart_backend.repository.OrderDetailsRepository;
import com.smartkart.smartkart_backend.repository.ProductRepository;
import com.smartkart.smartkart_backend.repository.UserRepository;
import com.smartkart.smartkart_backend.service.AdminOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminOrderServiceImpl implements AdminOrderService{

    @Autowired
    private OrderDetailsRepository orderDetailsRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<AdminOrderResponseDto> getAllOrders() {
        List<OrderDetails> orders = orderDetailsRepo.findAll();

        return orders.stream().map(order -> {
            AdminOrderResponseDto dto = new AdminOrderResponseDto();

            // Basic order details
            dto.setOrderId(order.getId());
            dto.setOrderDate(order.getLocalDate().toString());
            dto.setTotalPrice(order.getTotalPrice());
            dto.setOrderStatus(order.getOrderStatus());

            // User details
            User user = order.getUser();
            AdminUserDto userDTO = new AdminUserDto();
            userDTO.setId(user.getId());
            userDTO.setName(user.getName());
            userDTO.setEmail(user.getEmail());
            dto.setUser(userDTO);

            // Address details
            UserAddress address = order.getUserAddress();
            AddressResponseDto addrDTO = new AddressResponseDto();
            addrDTO.setFullName(address.getFullName());
            addrDTO.setPhoneNumber(address.getPhoneNumber());
            addrDTO.setFullAddress(address.getFullAddress());
            addrDTO.setPinCode(address.getPinCode());
            dto.setAddress(addrDTO);

            // Order items
            List<AdminOrderItemsDto> items = order.getOrderItems().stream().map(item -> {
                Product product = item.getProduct();
                AdminOrderItemsDto itemDTO = new AdminOrderItemsDto();
                itemDTO.setProductId(product.getId());
                itemDTO.setProductName(product.getName());
                itemDTO.setQuantity(item.getQuantity());
                itemDTO.setPrice(product.getPrice());

                itemDTO.setProductImage("http://localhost:8080/user/product/images/"+product.getId());

                return itemDTO;
            }).collect(Collectors.toList());

            dto.setOrderItems(items);

            return dto;
        }).collect(Collectors.toList());

    }

    @Override
    public void updateOrderStatus(Long orderId, Map<String, String> body) {
        String status=body.get("orderStatus");
        OrderDetails order=orderDetailsRepo.findById(orderId).orElseThrow(()-> new RuntimeException("Order Id is Null"));
        order.setOrderStatus(status);
        orderDetailsRepo.save(order);

    }

    @Override
    public AdminDashboardSummaryDto getSummary() {
        double revenue=orderDetailsRepo.calculateTotalRevenue();
        long orders=orderDetailsRepo.count();
        long customers= userRepo.countByRole("USER");
        long products=productRepo.count();
        return new AdminDashboardSummaryDto(revenue,orders,customers,products);
    }

    @Override
    public List<Map<String, Object>> getRecentOrders(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        return orderDetailsRepo.findRecentOrders(pageable);
    }
}
