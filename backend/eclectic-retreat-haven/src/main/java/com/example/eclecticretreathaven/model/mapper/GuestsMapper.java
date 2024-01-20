package com.example.eclecticretreathaven.model.mapper;

import com.example.eclecticretreathaven.model.Guests;
import org.springframework.stereotype.Service;

@Service
public class GuestsMapper {

    public Guests createGuest(String fullName,String email,String nationality,String nationalID,String countryFlag){
        Guests guests = new Guests();
        guests.setFullName(fullName);
        guests.setEmail(email);
        guests.setNationality(nationality);
        guests.setNationalID(nationalID);
        guests.setCountryFlag(countryFlag);

        return guests;
    }
}
