package com.smartkart.smartkart_backend.controller;

import com.smartkart.smartkart_backend.dto.LoginResponse;
import com.smartkart.smartkart_backend.dto.RegisterUser;
import com.smartkart.smartkart_backend.model.User;
import com.smartkart.smartkart_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody RegisterUser user){
        return userService.registerUser(user);
    }

//    @PostMapping("/verify")
//    public String verify(@RequestBody RegisterUser user){
//        return userService.verify(user);
//    }

    @PostMapping("/verify")
    public LoginResponse verify(@RequestBody RegisterUser user){
        return userService.verify(user);
    }

    @GetMapping("/getAllUser")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }
}
