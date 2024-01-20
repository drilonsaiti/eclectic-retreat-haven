package com.example.eclecticretreathaven.web;

import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.dto.BookingDTO;
import com.example.eclecticretreathaven.model.dto.BookingDetailsDto;
import com.example.eclecticretreathaven.model.dto.CreateBookingDto;
import com.example.eclecticretreathaven.model.dto.UpdateBookingDto;
import com.example.eclecticretreathaven.service.BookingsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingsController {

    @Autowired
    private BookingsService bookingsService;
    private static int PAGE_SIZE = 10;

    @GetMapping
    public Page<BookingDTO> getAllBookings(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "all") String types,
                                           @RequestParam(defaultValue = "all") String status,
                                           @RequestParam(defaultValue = "startDate-asc") String sort, HttpServletRequest req) {
        PageRequest pageable = PageRequest.of(page - 1, PAGE_SIZE);

        List<BookingDTO> bookingDTOList = bookingsService.getAllBookings(pageable, types, status, sort,req.getHeader("Autherization"));

        long totalElements = bookingsService.getTotalBookingsCount(types, status);

        return new PageImpl<>(bookingDTOList, pageable, totalElements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDetailsDto> getBookingById(@PathVariable Long id) {
        BookingDetailsDto booking = bookingsService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }

    @PostMapping
    public ResponseEntity<Bookings> createBooking(@RequestBody CreateBookingDto dto) throws ParseException {
        Bookings createdBooking = bookingsService.createBooking(dto);
        return ResponseEntity.ok(createdBooking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bookings> updateBooking(@PathVariable Long id, @RequestBody UpdateBookingDto booking) {
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
