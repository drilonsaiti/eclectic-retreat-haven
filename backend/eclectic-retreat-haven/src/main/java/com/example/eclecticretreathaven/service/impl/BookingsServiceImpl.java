package com.example.eclecticretreathaven.service.impl;

import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.Guests;
import com.example.eclecticretreathaven.model.Settings;
import com.example.eclecticretreathaven.model.dto.BookingDTO;
import com.example.eclecticretreathaven.model.dto.CreateBookingDto;
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
import java.util.List;

@Service
@AllArgsConstructor

public class BookingsServiceImpl implements BookingsService {

    private final BookingsRepository bookingsRepository;
    private final BookingMapper mapper;
    private final GuestsMapper guestsMapper;
    private final SettingsRepository settingsRepository;
    private final GuestsRepository guestsRepository;
    private final AccommodationsRepository accommodationsRepository;





    @Override
    public List<BookingDTO> getAllBookings(PageRequest pageable) {

        return bookingsRepository.findAll(pageable).stream().map(bookings ->
            mapper.mapEntityToDTO(null, bookings )
        ).toList();
    }

    public long getTotalBookingsCount() {
        return bookingsRepository.count();
    }

    @Override
    public Bookings getBookingById(Long id) {
        return bookingsRepository.findById(id).orElse(null);
    }

    @Override
    public Bookings createBooking(CreateBookingDto dto) throws ParseException {
        System.out.println(dto);
        Guests guests = guestsMapper.createGuest(dto.getFullName(),dto.getEmail(), dto.getNationality());
        this.guestsRepository.save(guests);
        Accommodations accm = this.accommodationsRepository.findById(dto.getAccommodationId()).orElseThrow();
        Settings settings = this.settingsRepository.findById(1L).orElseThrow();

        return bookingsRepository.save(mapper.mapToDto(dto,guests,accm,settings));
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

