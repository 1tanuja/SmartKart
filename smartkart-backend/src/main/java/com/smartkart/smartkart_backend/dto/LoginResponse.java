package com.smartkart.smartkart_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String email;
    private String token;
    private String role;
}
