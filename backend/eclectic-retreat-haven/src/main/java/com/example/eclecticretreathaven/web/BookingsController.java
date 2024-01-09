package com.example.eclecticretreathaven.web;

import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.dto.BookingDTO;
import com.example.eclecticretreathaven.model.dto.CreateBookingDto;
import com.example.eclecticretreathaven.service.BookingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingsController {

    @Autowired
    private BookingsService bookingsService;
    private static int PAGE_SIZE = 10;

    /*@GetMapping
    public List<BookingDTO> getAllBookings() {
        return bookingsService.getAllBookings();
    }*/

    @GetMapping
    public Page<BookingDTO> getAllBookings(@RequestParam(defaultValue = "0") int page) {
        PageRequest pageable = PageRequest.of(page - 1, PAGE_SIZE);
        List<BookingDTO> bookingDTOList = bookingsService.getAllBookings(pageable);

        long totalElements = bookingsService.getTotalBookingsCount();

        return new PageImpl<>(bookingDTOList, pageable, totalElements);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Bookings> getBookingById(@PathVariable Long id) {
        Bookings booking = bookingsService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }

    @PostMapping
    public ResponseEntity<Bookings> createBooking(@RequestBody CreateBookingDto dto) throws ParseException {
        Bookings createdBooking = bookingsService.createBooking(dto);
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

