package com.example.eclecticretreathaven.repository;

import com.example.eclecticretreathaven.model.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {
    // You can add custom queries if needed
}