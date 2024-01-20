package com.example.eclecticretreathaven.service;

import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.dto.*;
import org.springframework.data.domain.PageRequest;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.List;

public interface BookingsService {
    List<BookingDTO> getAllBookings(PageRequest pageable,String types,String status,String sort,String authHeader);
    public Comparable getFieldValue(Bookings booking, String field);
    BookingDetailsDto getBookingById(Long id);
    Bookings createBooking(CreateBookingDto dto) throws ParseException;
    Bookings updateBooking(Long id, UpdateBookingDto booking);

    List<BookingAfterDateDto> getBookingByAfterDate(String date);

    List<BookingDateDto> getBookedDates(Long id);

    List<BookingDetailsDto> getBookingBytaysAfterDate(String date);
    List<BookingDetailsDto> getStaysTodayActivity();
    void deleteBooking(Long id);
    long getTotalBookingsCount(String types, String status);
}