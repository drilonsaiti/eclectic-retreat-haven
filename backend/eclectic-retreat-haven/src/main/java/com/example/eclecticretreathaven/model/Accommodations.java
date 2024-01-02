package com.example.eclecticretreathaven.model;


import com.example.eclecticretreathaven.model.enums.AccommodationTypes;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "Accommodations")
@NoArgsConstructor
public class Accommodations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private Long accommodationId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "maxCapacity", nullable = false)
    private int maxCapacity;

    @Column(name = "regularPrice", nullable = false)
    private int regularPrice;

    @Column(name = "discount", nullable = false)
    private int discount;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "image", nullable = true)
    private String image;

    @Column(name = "types", nullable = true)
    private AccommodationTypes types;



    public Accommodations(String name, int maxCapacity, int regularPrice, int discount, String description, String image, AccommodationTypes types) {
        this.name = name;
        this.maxCapacity = maxCapacity;
        this.regularPrice = regularPrice;
        this.discount = discount;
        this.description = description;
        this.image = image;
        this.types = types;
    }
}
