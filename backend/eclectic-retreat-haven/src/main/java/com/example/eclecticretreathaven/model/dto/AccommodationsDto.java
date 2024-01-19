package com.example.eclecticretreathaven.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccommodationsDto {

    private String name;
    private int maxCapacity;
    private int regularPrice;
    private int discount;
    private String description;
    private String image;
    private String types;
}
