package com.smartkart.smartkart_backend.service;

import com.smartkart.smartkart_backend.dto.LoginResponse;
import com.smartkart.smartkart_backend.dto.RegisterUser;
import com.smartkart.smartkart_backend.model.User;

import java.util.List;

public interface UserService {

    public User registerUser(RegisterUser request);

//    String verify(RegisterUser user);

    LoginResponse verify(RegisterUser user);

    List<User> getAllUser();
}
