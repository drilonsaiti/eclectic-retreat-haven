package com.example.eclecticretreathaven.model.mapper;

import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.Guests;
import com.example.eclecticretreathaven.model.Settings;
import com.example.eclecticretreathaven.model.dto.*;
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


    private static float totalPrice(float price, float extraPrice){

        return price + extraPrice;
    }

    private static float extraPrice(boolean hasBreakfast, boolean hasDinner,int numNights,int numGuests, Settings settings){

        float extraPrice = 0;

        if (hasBreakfast) extraPrice += settings.getBreakfastPrice() * numGuests;
        if(hasDinner) extraPrice += settings.getDinnerPrice() * numGuests;

        return extraPrice * numNights;
    }

    private static float extraPriceChange(float extraPrice,boolean hasBreakfastDto,boolean hasDinnerDto,
                                          boolean hasBreakfast, boolean hasDinner,int numNights,int numGuests, Settings settings){
        float dinnerPrice = settings.getDinnerPrice() * numNights * numGuests;
        float breakfastPrice = settings.getBreakfastPrice() * numNights * numGuests;
        if (hasDinner && !hasDinnerDto){
            extraPrice -= dinnerPrice;
        }
        if (!hasDinner && hasDinnerDto){
            extraPrice += dinnerPrice;
        }

        if (hasBreakfast && !hasBreakfastDto){
            extraPrice -= breakfastPrice;
        }
        if (!hasBreakfast && hasBreakfastDto){
            extraPrice += breakfastPrice;
        }
        return extraPrice;
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
        float extrasPrice = extraPrice(dto.isHasBreakfast(), dto.isHasDinner(),dto.getNumNights(),dto.getNumGuests(),settings);

        bookings.setStartDate(startDate);
        bookings.setEndDate(endDate);
        bookings.setPrice(accm.getRegularPrice());
        bookings.setExtrasPrice(extrasPrice);
        bookings.setTotalPrice(totalPrice(accm.getRegularPrice(),extrasPrice));
        bookings.setNumNights(dto.getNumNights());
        bookings.setNumGuests(dto.getNumGuests());
        bookings.setHasBreakfast(dto.isHasBreakfast());
        bookings.setHasDinner(dto.isHasDinner());
        bookings.setObservations(dto.getObservations());
        bookings.setGuests(guests);
        bookings.setAccommodations(accm);
        return bookings;
    }

    public BookingDetailsDto toBookingDetailsDto(Bookings booking) {
        BookingDetailsDto dto = new BookingDetailsDto();
        dto.setBookingId(booking.getBookingId());
        dto.setCreatedAt(booking.getCreatedAt());
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        dto.setNumNights(booking.getNumNights());
        dto.setNumGuests(booking.getNumGuests());
        dto.setPrice(booking.getAccommodations().getRegularPrice());
        dto.setExtrasPrice(booking.getExtrasPrice());
        dto.setTotalPrice(booking.getTotalPrice());
        dto.setStatus(booking.getStatus());
        dto.setHasBreakfast(booking.isHasBreakfast());
        dto.setHasDinner(booking.isHasDinner());
        dto.setObservations(booking.getObservations());
        dto.setPaid(booking.isPaid());
        dto.setGuestDetails(toGuestDetailsDto(booking.getGuests()));
        dto.setAccommodationName(booking.getAccommodations().getName());
        dto.setTypes(booking.getAccommodations().getTypes().label);
        dto.setDiscount(booking.getAccommodations().getDiscount());
        return dto;
    }

    private static GuestDetailsDto toGuestDetailsDto(Guests guest) {
        GuestDetailsDto dto = new GuestDetailsDto();
        dto.setGuestId(guest.getGuestId());
        dto.setFullName(guest.getFullName());
        dto.setEmail(guest.getEmail());
        dto.setNationalID(guest.getNationalID());
        dto.setCountry(guest.getNationality());
        dto.setCountryFlag(guest.getCountryFlag());
        return dto;
    }

    public Bookings updateBookingForCheckin(UpdateBookingDto dto,Bookings bookings,Settings settings){
        System.out.println("DTOOOO");
        System.out.println(dto);
        float extraPrice = extraPriceChange(bookings.getExtrasPrice(), dto.isHasBreakfast(), dto.isHasDinner(),
                bookings.isHasBreakfast(), bookings.isHasDinner(), bookings.getNumNights(), bookings.getNumGuests(), settings);
        if (dto.getStatus().equals("checked-in") || dto.getStatus().equals("unconfirmed")) {
            bookings.setHasBreakfast(dto.isHasBreakfast());
            bookings.setHasDinner(dto.isHasDinner());
            bookings.setStatus(dto.getStatus());
            bookings.setExtrasPrice(extraPrice);
            bookings.setTotalPrice(bookings.getPrice() + extraPrice);
            bookings.setPaid(dto.isPaid());

        }else if (dto.getStatus().equals("checked-out")){
            bookings.setStatus(dto.getStatus());
        }


        return bookings;
    }

    public BookingAfterDateDto getBookingByAfterDate(Bookings bookings){
        BookingAfterDateDto dto = new BookingAfterDateDto();
        dto.setExtrasPrice(bookings.getExtrasPrice());
        dto.setCreatedAt(bookings.getCreatedAt());
        dto.setTotalPrice(bookings.getTotalPrice());

        return dto;
    }
    public BookingDateDto  getBookingDates (LocalDateTime start,LocalDateTime end){
        return new BookingDateDto(start,end);
    }
}