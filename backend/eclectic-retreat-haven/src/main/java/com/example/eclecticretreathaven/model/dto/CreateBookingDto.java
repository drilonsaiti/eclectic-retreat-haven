package com.example.eclecticretreathaven.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class CreateBookingDto {

    private String fullName;
    private String email;
    private String nationality;
    private String nationalID;
    private String countryFlag;
    private String startDate;
    private int numNights;
    private int numGuests;
    private boolean hasBreakfast;
    private boolean hasDinner;
    private String observations;
    private Long accommodationId;

}
