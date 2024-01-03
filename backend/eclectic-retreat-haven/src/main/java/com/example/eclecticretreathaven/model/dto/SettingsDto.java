package com.example.eclecticretreathaven.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SettingsDto {


    private int minBookingLength;
    private int maxBookingLength;
    private int maxGuestsPerBooking;
    private float breakfastPrice;
    private float dinnerPrice;


}