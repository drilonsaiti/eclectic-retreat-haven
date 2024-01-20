package com.example.eclecticretreathaven.model.dto;

import com.example.eclecticretreathaven.model.enums.AccommodationTypes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDetailsDto {
    private Long bookingId;
    private LocalDateTime createdAt;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int numNights;
    private int numGuests;

    private float price;
    private float extrasPrice;
    private float totalPrice;
    private String status;
    private boolean hasBreakfast;
    private boolean hasDinner;
    private String observations;
    private boolean isPaid;
   private GuestDetailsDto guestDetails;

    private String accommodationName;
    private String types;
    private float discount;




}
