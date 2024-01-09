package com.example.eclecticretreathaven.model.dto;

import com.example.eclecticretreathaven.model.enums.AccommodationTypes;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
public class BookingDTO {

    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int numNights;
    private int numGuests;
    private String status;
    private float totalPrice;
    private String accommodationName;
    private String guestFullName;
    private String guestEmail;
    private AccommodationTypes types;
}