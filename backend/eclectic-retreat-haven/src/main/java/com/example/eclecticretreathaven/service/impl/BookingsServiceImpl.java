package com.example.eclecticretreathaven.service.impl;

import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.Guests;
import com.example.eclecticretreathaven.model.Settings;
import com.example.eclecticretreathaven.model.dto.BookingDTO;
import com.example.eclecticretreathaven.model.dto.BookingDetailsDto;
import com.example.eclecticretreathaven.model.dto.CreateBookingDto;
import com.example.eclecticretreathaven.model.dto.UpdateBookingDto;
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
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Service
@AllArgsConstructor

public class BookingsServiceImpl implements BookingsService {

    private final BookingsRepository bookingsRepository;
    private final BookingMapper mapper;
    private final GuestsMapper guestsMapper;
    private final SettingsRepository settingsRepository;
    private final GuestsRepository guestsRepository;
    private final AccommodationsRepository accommodationsRepository;





    public List<BookingDTO> getAllBookings(PageRequest pageable, String types, String status, String sort) {
        List<Bookings> bookings = bookingsRepository.findAll();

        List<BookingDTO> result = bookings.stream()
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

        return result;
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
            bookings= mapper.updateBookingForCheckin(booking,bookings);
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
}

