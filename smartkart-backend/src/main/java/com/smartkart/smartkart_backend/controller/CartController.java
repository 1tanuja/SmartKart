package com.smartkart.smartkart_backend.controller;

import com.smartkart.smartkart_backend.dto.CartDto;
import com.smartkart.smartkart_backend.dto.CartResponseDto;
import com.smartkart.smartkart_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartDto cart){
        cartService.addToCart(cart.userId,cart.productId,cart.quantity);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getItem/{userId}")
    public ResponseEntity<List<CartResponseDto>> getCartItem(@PathVariable Long userId){
        List<CartResponseDto> cartItem=cartService.getCartItem(userId);
        return ResponseEntity.ok(cartItem);
    }

    @PutMapping("/updateCart")
    public ResponseEntity<?> updateCartItem(@RequestBody CartDto cart){
        cartService.updateCartItem(cart.userId,cart.productId,cart.quantity);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteCart/{cartId}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long cartId){
        cartService.deleteCartItem(cartId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
