package com.example.eclecticretreathaven.service;

import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.model.dto.AccommodationsDto;

import java.util.List;

public interface AccommodationsService {
    List<Accommodations> getAllAccommodations();
    Accommodations getAccommodationById(Long id);
    Accommodations createAccommodation(AccommodationsDto accommodationDto);
    Accommodations updateAccommodation(Long id, AccommodationsDto accommodationDto);
    void deleteAccommodation(Long id);
}
