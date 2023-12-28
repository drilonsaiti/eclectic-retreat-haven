package com.example.eclecticretreathaven.repository;

import com.example.eclecticretreathaven.model.Accommodations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccommodationsRepository extends JpaRepository<Accommodations, Long> {
    // You can add custom queries if needed
}
