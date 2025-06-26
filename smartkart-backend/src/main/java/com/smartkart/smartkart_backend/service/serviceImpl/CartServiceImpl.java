package com.smartkart.smartkart_backend.service.serviceImpl;

import com.smartkart.smartkart_backend.dto.CartDto;
import com.smartkart.smartkart_backend.dto.CartResponseDto;
import com.smartkart.smartkart_backend.model.Cart;
import com.smartkart.smartkart_backend.model.Product;
import com.smartkart.smartkart_backend.repository.CartRepository;
import com.smartkart.smartkart_backend.repository.ProductRepository;
import com.smartkart.smartkart_backend.repository.UserRepository;
import com.smartkart.smartkart_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductRepository productRepo;

    @Override
    public void addToCart(Long userId, Long productId, int quantity) {
        Optional<Cart> existing=cartRepo.findByUserIdAndProductId(userId,productId);
        if (existing.isPresent()) {
            Cart item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartRepo.save(item);
        } else {
            Cart newItem = new Cart();
            newItem.setUser(userRepo.findById(userId).orElseThrow());
            newItem.setProduct(productRepo.findById(productId).orElseThrow());
            newItem.setQuantity(quantity);
            cartRepo.save(newItem);
        }
    }

    @Override
    public List<CartResponseDto> getCartItem(Long userId) {
        List<Cart> cartItem=cartRepo.findByUserId(userId);
        List<CartResponseDto> cartResponce=new ArrayList<>();
        for(Cart item:cartItem){
           Product product= item.getProduct();
           CartResponseDto dto=new CartResponseDto();
           dto.setCartId((long) item.getId());
           dto.setProductId(product.getId());
           dto.setProductName(product.getName());
           dto.setOriginalPrice(product.getPrice());
           dto.setCategoryName(product.getCategory().getName());
           dto.setQuantity(item.getQuantity());
           dto.setImageUrl("http://localhost:8080/user/product/images/"+product.getId());
           double discountPercent=getDiscountByCategory(product.getCategory().getName());
           double offerPrice=product.getPrice() * (1 - discountPercent / 100 );
           dto.setDiscountPercent(discountPercent);
           dto.setOfferPrice(offerPrice);
           cartResponce.add(dto);

        }
        return cartResponce;
    }

    @Override
    public void updateCartItem(Long userId, Long productId, int quantity) {
        Cart cartItem=cartRepo.findByUserIdAndProductId(userId,productId).
                orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItem.setQuantity(quantity);
        cartRepo.save(cartItem);
    }

    @Override
    public void deleteCartItem(Long cartId) {
        cartRepo.deleteById(cartId);
    }

    public double getDiscountByCategory(String category){
        return switch (category.toLowerCase()) {
            case "mobiles" -> 25.0;
            case "electronics" -> 15.0;
            case "fashion" -> 10.0;
            default -> 5.0;
        };
    }
}
