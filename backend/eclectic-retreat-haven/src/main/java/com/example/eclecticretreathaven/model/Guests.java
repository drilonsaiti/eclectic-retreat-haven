package com.example.eclecticretreathaven.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "Guests")
@NoArgsConstructor
public class Guests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guest_id")
    private Long guestId;

    @Column(name = "fullName", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "nationalID", nullable = false)
    private String nationalID;

    @Column(name = "nationality", nullable = false)
    private String nationality;

    @Column(name = "countryFlag", nullable = false)
    private String countryFlag;


    public Guests(String fullName, String email, String nationalID, String nationality, String countryFlag) {
        this.fullName = fullName;
        this.email = email;
        this.nationalID = nationalID;
        this.nationality = nationality;
        this.countryFlag = countryFlag;
    }
}
