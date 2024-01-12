package com.example.eclecticretreathaven.repository;

import com.example.eclecticretreathaven.model.Bookings;
import com.example.eclecticretreathaven.model.enums.AccommodationTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {
    @Query("SELECT COUNT(b) FROM Bookings b " +
            "WHERE (:types IS NULL OR b.accommodations.types = :types) " +
            "OR (:status IS NULL OR b.status = :status)")
    long countFilteredBookings(@Param("types") AccommodationTypes types, @Param("status") String status);

    /*@Query("SELECT COUNT(b) FROM Bookings b " +
            "WHERE (:types = 'all' OR b.accommodations.types = :types) " +
            "OR (:status = 'all' OR b.status = :status)")
    long countFilteredBookings(@Param("types") String types, @Param("status") String status);*/
}