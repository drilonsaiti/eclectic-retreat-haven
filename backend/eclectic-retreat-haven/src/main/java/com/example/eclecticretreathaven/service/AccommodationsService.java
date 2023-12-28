package com.example.eclecticretreathaven.service;

import com.example.eclecticretreathaven.model.Accommodations;

import java.util.List;

public interface AccommodationsService {
    List<Accommodations> getAllAccommodations();
    Accommodations getAccommodationById(Long id);
    Accommodations createAccommodation(Accommodations accommodation);
    Accommodations updateAccommodation(Long id, Accommodations accommodation);
    void deleteAccommodation(Long id);
}
