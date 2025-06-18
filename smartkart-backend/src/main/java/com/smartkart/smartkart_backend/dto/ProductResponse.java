package com.smartkart.smartkart_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponse {
    private String name;
    private double price;
    private String description;
    private String imageUrl;
    private Long categoryId;
    private String categoryName;
}
