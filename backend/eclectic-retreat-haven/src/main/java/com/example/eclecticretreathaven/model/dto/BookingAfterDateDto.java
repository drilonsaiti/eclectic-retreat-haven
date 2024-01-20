package com.example.eclecticretreathaven.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BookingAfterDateDto {

    LocalDateTime createdAt;
    float totalPrice;
    float extrasPrice;
}
