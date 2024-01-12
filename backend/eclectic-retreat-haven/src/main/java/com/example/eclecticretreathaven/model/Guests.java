package com.example.eclecticretreathaven.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@Table(name = "Guests")
@OnDelete(action = OnDeleteAction.CASCADE)
public class Guests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guest_id")
    private Long guestId;

    @Column(name = "fullName" )
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "nationalID")
    private String nationalID;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "countryFlag")
    private String countryFlag;

    public Guests() {
        this.nationalID = "";
        this.countryFlag = "";
    }

    public Guests(String fullName, String email, String nationalID, String nationality, String countryFlag) {
        this.fullName = fullName;
        this.email = email;
        this.nationalID = nationalID;
        this.nationality = nationality;
        this.countryFlag = countryFlag;
    }
}
