package com.example.eclecticretreathaven.web;

import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.service.BookingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingsController {

    @Autowired
    private BookingsService bookingsService;

    @GetMapping
    public List<Bookings> getAllBookings() {
        return bookingsService.getAllBookings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bookings> getBookingById(@PathVariable Long id) {
        Bookings booking = bookingsService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }

    @PostMapping
    public ResponseEntity<Bookings> createBooking(@RequestBody Bookings booking) {
        Bookings createdBooking = bookingsService.createBooking(booking);
        return ResponseEntity.ok(createdBooking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bookings> updateBooking(@PathVariable Long id, @RequestBody Bookings booking) {
        Bookings updatedBooking = bookingsService.updateBooking(id, booking);
        if (updatedBooking != null) {
            return ResponseEntity.ok(updatedBooking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingsService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}

