package com.example.eclecticretreathaven.repository;

import com.example.eclecticretreathaven.model.Guests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestsRepository extends JpaRepository<Guests, Long> {
    // You can add custom queries if needed
}
