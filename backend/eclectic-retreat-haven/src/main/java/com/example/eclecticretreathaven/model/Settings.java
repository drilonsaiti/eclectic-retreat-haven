package com.example.eclecticretreathaven.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Settings")
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "settings_id")
    private Long settingsId;

    @Column(name = "createdAt", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "minBookingLength", nullable = false)
    private int minBookingLength;

    @Column(name = "maxBookingLength", nullable = false)
    private int maxBookingLength;

    @Column(name = "maxGuestsPerBooking", nullable = false)
    private int maxGuestsPerBooking;

    @Column(name = "breakfastPrice", nullable = false)
    private float breakfastPrice;

    @Column(name = "dinnerPrice", nullable = false)
    private float dinnerPrice;

    public Settings(int minBookingLength, int maxBookingLength, int maxGuestsPerBooking, float breakfastPrice, float dinnerPrice) {
        this.createdAt = LocalDateTime.now();
        this.minBookingLength = minBookingLength;
        this.maxBookingLength = maxBookingLength;
        this.maxGuestsPerBooking = maxGuestsPerBooking;
        this.breakfastPrice = breakfastPrice;
        this.dinnerPrice = dinnerPrice;
    }
}
