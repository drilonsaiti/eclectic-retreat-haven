package com.example.eclecticretreathaven.service;

import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.dto.BookingDTO;
import com.example.eclecticretreathaven.model.dto.BookingDetailsDto;
import com.example.eclecticretreathaven.model.dto.CreateBookingDto;
import com.example.eclecticretreathaven.model.dto.UpdateBookingDto;
import org.springframework.data.domain.PageRequest;

import java.text.ParseException;
import java.util.List;

public interface BookingsService {
    List<BookingDTO> getAllBookings(PageRequest pageable,String types,String status,String sort);
    public Comparable getFieldValue(Bookings booking, String field);
    BookingDetailsDto getBookingById(Long id);
    Bookings createBooking(CreateBookingDto dto) throws ParseException;
    Bookings updateBooking(Long id, UpdateBookingDto booking);
    void deleteBooking(Long id);
    long getTotalBookingsCount(String types, String status);
}