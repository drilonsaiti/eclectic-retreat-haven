package com.example.eclecticretreathaven.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Bookings")
public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "startDate", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "endDate", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "numNights", nullable = false)
    private int numNights;

    @Column(name = "price", nullable = false)
    private float price;

    @Column(name = "extrasPrice", nullable = false)
    private float extrasPrice;

    @Column(name = "totalPrice", nullable = false)
    private float totalPrice;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "hasBreakfast", nullable = false)
    private boolean hasBreakfast;

    @Column(name = "hasDinner", nullable = false)
    private boolean hasDinner;

    @Column(name = "observations", nullable = false)
    private String observations;

    @ManyToOne
    @JoinColumn(name = "guests_id")
    private Guests guests;

    @ManyToOne
    @JoinColumn(name = "accommodations_id")
    private Accommodations accommodations;

    public Bookings(LocalDateTime startDate, LocalDateTime endDate, int numNights, float price, float extrasPrice, float totalPrice, String status, boolean hasBreakfast, boolean hasDinner, String observations, Guests guests, Accommodations accommodations) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.numNights = numNights;
        this.price = price;
        this.extrasPrice = extrasPrice;
        this.totalPrice = totalPrice;
        this.status = status;
        this.hasBreakfast = hasBreakfast;
        this.hasDinner = hasDinner;
        this.observations = observations;
        this.guests = guests;
        this.accommodations = accommodations;
    }
}
