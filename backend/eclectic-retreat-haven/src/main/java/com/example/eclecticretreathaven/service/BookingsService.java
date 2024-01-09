package com.example.eclecticretreathaven.service;

import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.dto.BookingDTO;
import com.example.eclecticretreathaven.model.dto.CreateBookingDto;
import org.springframework.data.domain.PageRequest;

import java.text.ParseException;
import java.util.List;

public interface BookingsService {
    List<BookingDTO> getAllBookings(PageRequest pageable);
    Bookings getBookingById(Long id);
    Bookings createBooking(CreateBookingDto dto) throws ParseException;
    Bookings updateBooking(Long id, Bookings booking);
    void deleteBooking(Long id);
    long getTotalBookingsCount();

}