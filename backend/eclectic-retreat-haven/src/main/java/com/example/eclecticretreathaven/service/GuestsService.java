package com.example.eclecticretreathaven.service;

import com.example.eclecticretreathaven.model.Guests;

import java.util.List;

public interface GuestsService {
    List<Guests> getAllGuests();
    Guests getGuestById(Long id);
    Guests createGuest(Guests guest);
    Guests updateGuest(Long id, Guests guest);
    void deleteGuest(Long id);
}
