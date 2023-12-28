package com.example.eclecticretreathaven.service;

import com.example.eclecticretreathaven.model.Bookings;

import java.util.List;

public interface BookingsService {
    List<Bookings> getAllBookings();
    Bookings getBookingById(Long id);
    Bookings createBooking(Bookings booking);
    Bookings updateBooking(Long id, Bookings booking);
    void deleteBooking(Long id);
}