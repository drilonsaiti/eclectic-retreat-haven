package com.example.eclecticretreathaven.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Bookings")
public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "createdAt")
    private LocalDateTime createdAt;

    @Column(name = "startDate")
    private LocalDateTime startDate;

    @Column(name = "endDate")
    private LocalDateTime endDate;

    @Column(name = "numNights")
    private int numNights;

    @Column(name = "numGuets")
    private int numGuests;

    @Column(name = "price")
    private float price;

    @Column(name = "extrasPrice")
    private float extrasPrice;

    @Column(name = "totalPrice")
    private float totalPrice;

    @Column(name = "status")
    private String status;

    @Column(name = "hasBreakfast")
    private boolean hasBreakfast;

    @Column(name = "hasDinner")
    private boolean hasDinner;

    @Column(name = "observations")
    private String observations;

    @Column(name = "isPaid")
    private boolean isPaid;

    @ManyToOne
    @JoinColumn(name = "guests_id")
    private Guests guests;

    @ManyToOne
    @JoinColumn(name = "accommodations_id")
    private Accommodations accommodations;

    public Bookings() {
        this.createdAt = LocalDateTime.now();
        this.status =  "unconfirmed";
        this.hasBreakfast = false;
        this.hasDinner = false;
        this.extrasPrice = 0;
        this.totalPrice = 0;
        this.isPaid = false;

    }

    public Bookings(LocalDateTime startDate, LocalDateTime endDate,
                    int numNights, int numGuests, float price, float extrasPrice, float totalPrice, String status, boolean hasBreakfast,
                    boolean hasDinner, String observations, Guests guests, Accommodations accommodations) {
        this.createdAt = LocalDateTime.now();
        this.startDate = startDate;
        this.endDate = endDate;
        this.numNights = numNights;
        this.numGuests = numGuests;
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
