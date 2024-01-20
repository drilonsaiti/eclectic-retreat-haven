package com.example.eclecticretreathaven.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GuestDetailsDto {

    private Long guestId;
    private String fullName;
    private String email;
    private String country;
    private String countryFlag;
    private String nationalID;
}
