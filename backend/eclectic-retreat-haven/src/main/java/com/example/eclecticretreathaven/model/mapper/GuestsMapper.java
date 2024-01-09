package com.example.eclecticretreathaven.model.mapper;

import com.example.eclecticretreathaven.model.Guests;
import org.springframework.stereotype.Service;

@Service
public class GuestsMapper {

    public Guests createGuest(String fullName,String email,String nationality){
        Guests guests = new Guests();
        guests.setFullName(fullName);
        guests.setEmail(email);
        guests.setNationality(nationality);

        return guests;
    }
}
