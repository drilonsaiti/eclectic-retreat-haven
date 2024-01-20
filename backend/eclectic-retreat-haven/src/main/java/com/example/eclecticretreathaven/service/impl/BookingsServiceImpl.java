package com.example.eclecticretreathaven.service.impl;

import com.example.eclecticretreathaven.config.JwtService;
import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.Guests;
import com.example.eclecticretreathaven.model.Settings;
import com.example.eclecticretreathaven.model.dto.*;
import com.example.eclecticretreathaven.model.enums.AccommodationTypes;
import com.example.eclecticretreathaven.model.mapper.BookingMapper;
import com.example.eclecticretreathaven.model.mapper.GuestsMapper;
import com.example.eclecticretreathaven.repository.AccommodationsRepository;
import com.example.eclecticretreathaven.repository.BookingsRepository;
import com.example.eclecticretreathaven.repository.GuestsRepository;
import com.example.eclecticretreathaven.repository.SettingsRepository;
import com.example.eclecticretreathaven.service.BookingsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Stream;

@Service
@AllArgsConstructor

public class BookingsServiceImpl implements BookingsService {

    private final BookingsRepository bookingsRepository;
    private final BookingMapper mapper;
    private final GuestsMapper guestsMapper;
    private final SettingsRepository settingsRepository;
    private final GuestsRepository guestsRepository;
    private final AccommodationsRepository accommodationsRepository;
    private final JwtService jwtService;





    public List<BookingDTO> getAllBookings(PageRequest pageable, String types, String status, String sort,String authHeader) {
        List<Bookings> bookings;
        if (authHeader.startsWith("Bearer ")){
            String jwt = authHeader.substring(7);
            String email = jwtService.extractUsername(jwt);

            bookings = bookingsRepository.findAllByGuests_Email(email);
        }else{
            bookings = bookingsRepository.findAll();
        }

        return bookings.stream()
                .filter(booking -> (types.equals("all") || booking.getAccommodations().getTypes().label.equalsIgnoreCase(types.replace("_", " ")))
                        && (status.equals("all") || (status.equals("checked-out") && booking.getStatus().equals("checked-out"))
                        || (status.equals("checked-in") && booking.getStatus().equals("checked-in"))
                        || (status.equals("unconfirmed") && booking.getStatus().equals("unconfirmed"))))
                .sorted((a, b) -> {
                    String[] sortBy = sort.split("-");
                    String field = sortBy[0];
                    String direction = sortBy[1];
                    Comparable fieldA = getFieldValue(a, field);
                    Comparable fieldB = getFieldValue(b, field);

                    return direction.equals("asc") ? fieldA.compareTo(fieldB) : fieldB.compareTo(fieldA);
                })
                .skip(pageable.getOffset())
                .limit(pageable.getPageSize())
                .map(booking -> mapper.mapEntityToDTO(null, booking))
                .toList();
    }

    public Comparable getFieldValue(Bookings booking, String field) {
        switch (field) {
            case "startDate":
                return booking.getStartDate();
            case "totalPrice":
                return booking.getTotalPrice();
            default:
                throw new IllegalArgumentException("Invalid field for sorting: " + field);
        }
    }
    public long getTotalBookingsCount(String types, String status) {
        if (types.isEmpty() || status.isEmpty())
            return bookingsRepository.count();
        AccommodationTypes accommodationTypes = ( !types.equals("all")) ?
                AccommodationTypes.fromLabelIgnoreCase(types.replace("_", " ")) : null;
        if (!types.equals("all") && !status.equals("all"))
            return this.bookingsRepository.countFilteredBookings(accommodationTypes,status);
        else if (!types.equals("all"))
            return this.bookingsRepository.countFilteredBookings(accommodationTypes,"");
        else if ( !status.equals("all"))
            return this.bookingsRepository.countFilteredBookings(null,status);


        return bookingsRepository.count();

    }

    @Override
    public BookingDetailsDto getBookingById(Long id) {
        return bookingsRepository.findById(id).map(mapper::toBookingDetailsDto).orElse(null);
    }

    @Override
    public Bookings createBooking(CreateBookingDto dto) throws ParseException {
        System.out.println(dto);
        Guests guests = guestsMapper.createGuest(dto.getFullName(),dto.getEmail(), dto.getNationality(), dto.getNationalID(), dto.getCountryFlag());
        this.guestsRepository.save(guests);
        Accommodations accm = this.accommodationsRepository.findById(dto.getAccommodationId()).orElseThrow();
        Settings settings = this.settingsRepository.findById(1L).orElseThrow();

        return bookingsRepository.save(mapper.mapToDto(dto,guests,accm,settings));
    }

    @Override
    public Bookings updateBooking(Long id, UpdateBookingDto booking) {
        if (bookingsRepository.existsById(id)) {
            Bookings bookings = this.bookingsRepository.findById(id).orElseThrow();
            Settings settings = this.settingsRepository.findById(1L).orElseThrow();
            bookings= mapper.updateBookingForCheckin(booking,bookings,settings);
            return bookingsRepository.save(bookings);
        }
        return null;
    }

    @Override
    public void deleteBooking(Long id) {
        Bookings booking = bookingsRepository.findById(id).orElse(null);
        if (booking != null) {
            booking.setGuests(null);
            bookingsRepository.delete(booking);
        }
    }

    @Override
    public List<BookingAfterDateDto> getBookingByAfterDate(String date) {
        System.out.println("DATE: " + date);
        return this.bookingsRepository
                .findAllByCreatedAtAfterAndCreatedAtBefore(LocalDateTime.parse(date.replaceAll("Z",""))
                        ,LocalDateTime.now())
                .stream().map(mapper::getBookingByAfterDate).toList();
    }

    @Override
    public List<BookingDetailsDto> getBookingBytaysAfterDate(String date) {
        return this.bookingsRepository
                .findAllByCreatedAtAfterAndCreatedAtBefore(LocalDateTime.parse(date.replaceAll("Z",""))
                        ,LocalDateTime.now())
                .stream().filter(bookings -> bookings.getStatus().equals("checked-in") ||
                        bookings.getStatus().equals("checked-out")).map(mapper::toBookingDetailsDto).toList();
    }


    @Override
    public List<BookingDetailsDto> getStaysTodayActivity() {
        return this.bookingsRepository.findCustomBookings(LocalDate.now(),LocalDate.now())
                .stream().map(mapper::toBookingDetailsDto).toList();
    }

    @Override
    public List<BookingDateDto> getBookedDates(Long id) {
        List<Bookings> bookedDates = this.bookingsRepository.findAllByAccommodations_AccommodationId(id);
        System.out.println("======BOOKED=====");
        System.out.println(bookedDates);

        // Extract and return a list of booked start and end dates
        return bookedDates.stream()
                .map(bookings -> mapper.getBookingDates(bookings.getStartDate(),bookings.getEndDate()))
                .toList();
    }
}

