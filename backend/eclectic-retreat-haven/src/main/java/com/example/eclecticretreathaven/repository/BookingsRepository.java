package com.example.eclecticretreathaven.repository;

import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.enums.AccommodationTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {

    List<Bookings> findAllByAccommodations_AccommodationId(Long id);
    List<Bookings> findAllByGuests_Email(String email);
    @Query("SELECT COUNT(b) FROM Bookings b " +
            "WHERE (:types IS NULL OR b.accommodations.types = :types) " +
            "OR (:status IS NULL OR b.status = :status)")
    long countFilteredBookings(@Param("types") AccommodationTypes types, @Param("status") String status);

    List<Bookings> findAllByCreatedAtAfterAndCreatedAtBefore(LocalDateTime after,LocalDateTime before);
    List<Bookings> findAllByStartDateAfterAndStartDateBefore(LocalDateTime after,LocalDateTime before);

    @Query("SELECT b FROM Bookings b WHERE " +
            "((b.status = 'unconfirmed' AND CAST(b.startDate AS LocalDate) = :startDate) OR " +
            "(b.status = 'checked-in' AND CAST(b.endDate AS LocalDate) = :endDate))")
    List<Bookings> findCustomBookings(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate  endDate);

}