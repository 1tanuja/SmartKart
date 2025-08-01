package com.smartkart.smartkart_backend.repository;

import com.smartkart.smartkart_backend.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {


    Optional<UserAddress> findByUserId(Long userId);

}
