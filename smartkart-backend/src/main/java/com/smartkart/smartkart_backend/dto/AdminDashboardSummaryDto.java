package com.smartkart.smartkart_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDashboardSummaryDto {
    private double revenue;
    private long orders;
    private long customers;
    private long products;
}
