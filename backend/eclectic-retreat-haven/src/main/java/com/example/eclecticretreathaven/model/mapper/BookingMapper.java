package com.example.eclecticretreathaven.model.mapper;

import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.Guests;
import com.example.eclecticretreathaven.model.Settings;
import com.example.eclecticretreathaven.model.dto.BookingDTO;
import com.example.eclecticretreathaven.model.dto.CreateBookingDto;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Set;

@Service
public class BookingMapper {

    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
    private static final int START_HOUR = 10;
    private static final int END_HOUR = 9;
    private static LocalDateTime convertToLocalDateTime(String dateString) {
        System.out.println("DATE STRING: " + dateString);
        LocalDateTime dateTime = LocalDateTime.parse(dateString+"T"+START_HOUR+":00:00");
        System.out.println(dateTime);
        return dateTime;
    }


    private static float totalPrice(float price, float extraPrice, boolean hasBreakfast, boolean hasDinner,float discount, Settings settings){

        float totalPrice = price + extraPrice;

        if (hasBreakfast) totalPrice += settings.getBreakfastPrice();
        if(hasDinner) totalPrice += settings.getDinnerPrice();

        return totalPrice - discount;
    }
    public BookingDTO mapEntityToDTO(Bookings dto,Bookings bookings) {
        Bookings entity = (bookings != null) ? bookings : new Bookings();

        return new BookingDTO(
                entity.getBookingId(),
                entity.getCreatedAt(),
                entity.getStartDate(),
                entity.getEndDate(),
                entity.getNumNights(),
                entity.getNumGuests(),
                entity.getStatus(),
                entity.getTotalPrice(),
                entity.getAccommodations().getName(),
                entity.getGuests().getFullName(),
                entity.getGuests().getEmail(),
                entity.getAccommodations().getTypes()
        );
    }

    public static Bookings mapToDto(CreateBookingDto dto, Guests guests, Accommodations accm,Settings settings) throws ParseException {
        Bookings bookings = new Bookings();
        LocalDateTime startDate = convertToLocalDateTime(dto.getStartDate());
        int numOfNights = dto.getNumNights();
        LocalDateTime endDate = startDate.plusDays(numOfNights).minusHours(1);


        bookings.setStartDate(startDate);
        bookings.setEndDate(endDate);
        bookings.setTotalPrice(totalPrice(accm.getRegularPrice(),0,dto.isHasBreakfast(), dto.isHasDinner(),accm.getDiscount(), settings));
        bookings.setNumNights(dto.getNumNights());
        bookings.setNumGuests(dto.getNumGuests());
        bookings.setObservations(dto.getObservations());
        bookings.setGuests(guests);
        bookings.setAccommodations(accm);
        return bookings;
    }
}