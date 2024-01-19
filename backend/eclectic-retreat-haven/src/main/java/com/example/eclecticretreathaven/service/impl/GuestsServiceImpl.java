package com.example.eclecticretreathaven.service.impl;

import com.example.eclecticretreathaven.model.Guests;
import com.example.eclecticretreathaven.repository.GuestsRepository;
import com.example.eclecticretreathaven.service.GuestsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor

public class GuestsServiceImpl implements GuestsService {

    private final GuestsRepository guestsRepository;

    @Override
    public List<Guests> getAllGuests() {
        return guestsRepository.findAll();
    }

    @Override
    public Guests getGuestById(Long id) {
        return guestsRepository.findById(id).orElse(null);
    }

    @Override
    public Guests createGuest(Guests guest) {
        return guestsRepository.save(guest);
    }

    @Override
    public Guests updateGuest(Long id, Guests guest) {
        if (guestsRepository.existsById(id)) {
            guest.setGuestId(id);
            return guestsRepository.save(guest);
        }
        return null;
    }

    @Override
    public void deleteGuest(Long id) {
        guestsRepository.deleteById(id);
    }
}
