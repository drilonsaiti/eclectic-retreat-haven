package com.example.eclecticretreathaven.web;

import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.dto.*;
import com.example.eclecticretreathaven.service.BookingsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173",allowCredentials = "true")

public class BookingsController {

    @Autowired
    private BookingsService bookingsService;
    private static int PAGE_SIZE = 10;

    /*@GetMapping
    public List<BookingDTO> getAllBookings() {
        return bookingsService.getAllBookings();
    }*/

    @GetMapping
    public Page<BookingDTO> getAllBookings(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "all") String types,
                                           @RequestParam(defaultValue = "all") String status,
                                           @RequestParam(defaultValue = "startDate-asc") String sort) {
        PageRequest pageable = PageRequest.of(page - 1, PAGE_SIZE);

        List<BookingDTO> bookingDTOList = bookingsService.getAllBookings(pageable,types,status,sort,"");

        long totalElements = bookingsService.getTotalBookingsCount(types,status);

        return new PageImpl<>(bookingDTOList, pageable, totalElements);
    }

    @GetMapping("myBookings")
    public Page<BookingDTO> getAllMyBookings(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "all") String types,
                                             @RequestParam(defaultValue = "all") String status,
                                             @RequestParam(defaultValue = "startDate-asc") String sort, HttpServletRequest req) {
        PageRequest pageable = PageRequest.of(page - 1, PAGE_SIZE);
        String authHeader = req.getHeader("Authorization");
        List<BookingDTO> bookingDTOList = bookingsService.getAllBookings(pageable,types,status,sort,authHeader);

        long totalElements = bookingsService.getTotalBookingsCount(types,status);

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
        System.out.println("=======BOOKING======");
        System.out.println(booking);
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

    @GetMapping("/last")
    public ResponseEntity<List<BookingAfterDateDto>> getBookingByAfterDate(@RequestParam String last) {
        List<BookingAfterDateDto> booking = bookingsService.getBookingByAfterDate(last);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/stays")
    public ResponseEntity<List<BookingDetailsDto>> getStaysAfterDate(@RequestParam String stays) {
        List<BookingDetailsDto> booking = bookingsService.getBookingBytaysAfterDate(stays);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/activity")
    public ResponseEntity<List<BookingDetailsDto>> getStaysTodayActivity() {
        List<BookingDetailsDto> booking = bookingsService.getStaysTodayActivity();
        return ResponseEntity.ok(booking);
    }
    @GetMapping("/booked-dates/{id}")
    public ResponseEntity<List<BookingDateDto>> getBookedDates(@PathVariable Long id) {
        System.out.println("BOOKED DATES ID:" + id);
        List<BookingDateDto> bookedDates = bookingsService.getBookedDates(id);
        return ResponseEntity.ok(bookedDates);
    }

}

