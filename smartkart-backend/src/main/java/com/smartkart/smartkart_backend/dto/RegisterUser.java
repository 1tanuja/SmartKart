package com.smartkart.smartkart_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUser {
    private String name;
    private String email;
    private String password;
    private String role; //ADMIN,CUSTOMER

}
