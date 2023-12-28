package com.example.eclecticretreathaven.service.impl;

import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.repository.BookingsRepository;
import com.example.eclecticretreathaven.service.BookingsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor

public class BookingsServiceImpl implements BookingsService {

    private final BookingsRepository bookingsRepository;

    @Override
    public List<Bookings> getAllBookings() {
        return bookingsRepository.findAll();
    }

    @Override
    public Bookings getBookingById(Long id) {
        return bookingsRepository.findById(id).orElse(null);
    }

    @Override
    public Bookings createBooking(Bookings booking) {
        return bookingsRepository.save(booking);
    }

    @Override
    public Bookings updateBooking(Long id, Bookings booking) {
        if (bookingsRepository.existsById(id)) {
            booking.setBookingId(id);
            return bookingsRepository.save(booking);
        }
        return null;
    }

    @Override
    public void deleteBooking(Long id) {
        bookingsRepository.deleteById(id);
    }
}

