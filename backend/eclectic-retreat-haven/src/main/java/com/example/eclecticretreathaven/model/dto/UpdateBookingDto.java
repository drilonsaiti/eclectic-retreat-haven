package com.example.eclecticretreathaven.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBookingDto {

    boolean hasBreakfast;
    boolean hasDinner;
    String status;
    boolean paid;

}
