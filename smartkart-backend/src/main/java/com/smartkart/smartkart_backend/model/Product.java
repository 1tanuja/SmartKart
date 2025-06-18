package com.smartkart.smartkart_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    private double price;
    @ManyToOne
    @JoinColumn(name = "category_id",nullable = false)
    @JsonIgnoreProperties("products")
    private Category category;
    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageData;


//    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
//    @JoinTable(name = "product_images",
//            joinColumns = {@JoinColumn(name="product_id")},
//            inverseJoinColumns = {@JoinColumn(name = "image_id")}
//    )
//    private Set<Image> images;
}
