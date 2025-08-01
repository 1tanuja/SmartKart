package com.smartkart.smartkart_backend.service.serviceImpl;

import com.smartkart.smartkart_backend.dto.*;
import com.smartkart.smartkart_backend.model.*;
import com.smartkart.smartkart_backend.repository.*;
import com.smartkart.smartkart_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private OrderDetailsRepository orderDetailsRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    @Autowired
    private UserAddressRepository userAddressRepo;

    @Override
    public OrderResponseDto placeOrder(PlaceOrderDto placeOrder) {
        // 1. Get the user
        User user=userRepo.findById(placeOrder.getUserId()
        ).orElseThrow(()->new RuntimeException("User Not Found"));

        // 2. Handle address: save new or fetch existing
        UserAddress address;
        if(placeOrder.isNewAddress()){
            address=new UserAddress();
            address.setFullName(placeOrder.getFullName());
            address.setPhoneNumber(placeOrder.getPhoneNumber());
            address.setFullAddress(placeOrder.getFullAddress());
            address.setPinCode(placeOrder.getPinCode());
            address.setUser(user);
            userAddressRepo.save(address);
        }else {
            Long addressId = placeOrder.getAddressId();
            if (addressId == null) {
                throw new RuntimeException("Address ID cannot be null when isNewAddress is false");
            }
            address = userAddressRepo.findById(addressId)
                    .orElseThrow(() -> new RuntimeException("Address Not Found"));
        }

        // 3. Create order details
        OrderDetails orderDetails=new OrderDetails();
        orderDetails.setUser(user);
        orderDetails.setUserAddress(address);
        orderDetails.setOrderStatus(placeOrder.getOrderStatus());
        orderDetails.setTotalPrice(placeOrder.getTotalPrice());
        orderDetails.setLocalDate(LocalDate.now());

        // 4. Create order items
        List<OrderItem> orderItems=new ArrayList<>();
        for(OrderProductDto dto:placeOrder.getProducts()){
            Product product=productRepo.findById(dto.getProductId()
            ).orElseThrow(()-> new RuntimeException("Product Not found"));

        OrderItem item=new OrderItem();
        item.setProduct(product);
        item.setQuantity(dto.getQuantity());
        item.setUnitPrice(dto.getUnitPrice());
        item.setOrder(orderDetails);
        orderItems.add(item);
        }

        orderDetails.setOrderItems(orderItems);

        // 5. Save the order (cascades items)
        orderDetailsRepo.save(orderDetails);

        // 6. Delete cart items if from cart
        if(placeOrder.isFromCart()){
            cartRepo.deleteByUserId(user.getId());
        }

        // 7. Map and return response
        return mapToDto(orderDetails, address);

    }

    @Override
    public AddressResponseDto getAddress(Long userId) {
        UserAddress userAddress=userAddressRepo.findByUserId(userId).orElse(null);
        if(userAddress == null) return null;
        AddressResponseDto addressResponse=new AddressResponseDto();
        addressResponse.setId(userAddress.getId());
        addressResponse.setFullName(userAddress.getFullName());
        addressResponse.setFullAddress(userAddress.getFullAddress());
        addressResponse.setPinCode(userAddress.getPinCode());
        addressResponse.setPhoneNumber(userAddress.getPhoneNumber());
        return addressResponse;
    }

    @Override
    public void updateOrderStatus(PaymentStatusDto paymentStatus) {
        OrderDetails order = orderDetailsRepo.findById(paymentStatus.getOrderId()).orElseThrow();
        order.setOrderStatus(paymentStatus.getOrderStatus());
    }

    @Override
    public ProfileResponseDto getProfile(Long userId) {
        User user=userRepo.findById(userId).orElseThrow();
        ProfileResponseDto profile=new ProfileResponseDto();
        profile.setUserName(user.getName());
        profile.setEmail(user.getEmail());
        UserAddress userAddress=userAddressRepo.findByUserId(userId).orElseThrow();
        profile.setPhoneNumber(userAddress.getPhoneNumber());
        profile.setAddress(userAddress.getFullAddress());
        profile.setPinCode(userAddress.getPinCode());

        Optional<OrderDetails> recentOrder = orderDetailsRepo.findTopByUserIdOrderByLocalDateDesc(userId);
        if(recentOrder.isPresent()){
            OrderDetails order=recentOrder.get();
            RecentOrderDto recentOrderDto=new RecentOrderDto();
            recentOrderDto.setOrderId(order.getId());
            recentOrderDto.setTotalPrice(order.getTotalPrice());
            recentOrderDto.setOrderDate(order.getLocalDate().toString());
            recentOrderDto.setOrderStatus(order.getOrderStatus());
            List<String> productNames=order.getOrderItems().
                    stream().map(item-> item.getProduct().getName()).
                    toList();
            recentOrderDto.setProductNames(productNames);
            profile.setRecentOrders(recentOrderDto);
        }

        return profile;
    }

    @Override
    public List<OrderResponseDto> getOrders(Long userId) {
        List<OrderDetails> orderDetails = orderDetailsRepo.findByUserId(userId).orElseThrow();
        List<OrderResponseDto> responseList = new ArrayList<>();
        for(OrderDetails orders:orderDetails){
            OrderResponseDto responseDto=new OrderResponseDto();
            responseDto.setOrderId(orders.getId());
            responseDto.setOrderDate(orders.getLocalDate());
            responseDto.setOrderStatus(orders.getOrderStatus());
            responseDto.setTotalPrice(orders.getTotalPrice());
            List<OrderItemResponseDto> itemsResponseDto=new ArrayList<>();
            for(OrderItem item:orders.getOrderItems()){
                Product product=item.getProduct();
                OrderItemResponseDto itemDto=new OrderItemResponseDto();
                itemDto.setProductId(product.getId());
                itemDto.setUnitPrice(product.getPrice());
                itemDto.setProductName(product.getName());
                itemDto.setProductImage("http://localhost:8080/user/product/images/"+product.getId());
                itemsResponseDto.add(itemDto);
            }
            responseDto.setItems(itemsResponseDto);
            responseList.add(responseDto);
        }
        return responseList;
    }


    public OrderResponseDto mapToDto(OrderDetails order,UserAddress address){
        OrderResponseDto dto=new OrderResponseDto();
        dto.setOrderId(order.getId());
        dto.setOrderDate(order.getLocalDate());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setOrderStatus(order.getOrderStatus());

        String fullAddress=address.getFullName()+", "
                +address.getFullAddress()+
                ", "+address.getPhoneNumber()+
                ", "+ address.getPinCode();
        dto.setDeliveryAddress(fullAddress);

        List<OrderItemResponseDto> items=new ArrayList<>();
        for(OrderItem item:order.getOrderItems()){
            OrderItemResponseDto itemResponse=new OrderItemResponseDto();
            itemResponse.setProductId(item.getProduct().getId());
            itemResponse.setProductName(item.getProduct().getName());
            itemResponse.setQuantity(item.getQuantity());
            itemResponse.setUnitPrice(item.getUnitPrice());
            items.add(itemResponse);
        }
        dto.setItems(items);
        return dto;
    }
}
