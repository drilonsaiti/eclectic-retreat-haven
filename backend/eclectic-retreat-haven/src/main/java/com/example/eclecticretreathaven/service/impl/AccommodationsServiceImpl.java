package com.example.eclecticretreathaven.service.impl;

import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.repository.AccommodationsRepository;
import com.example.eclecticretreathaven.service.AccommodationsService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccommodationsServiceImpl implements AccommodationsService {


    private final AccommodationsRepository accommodationsRepository;

    @Override
    public List<Accommodations> getAllAccommodations() {
        return accommodationsRepository.findAll();
    }

    @Override
    public Accommodations getAccommodationById(Long id) {
        return accommodationsRepository.findById(id).orElse(null);
    }

    @Override
    public Accommodations createAccommodation(Accommodations accommodation) {
        return accommodationsRepository.save(accommodation);
    }

    @Override
    public Accommodations updateAccommodation(Long id, Accommodations accommodation) {
        if (accommodationsRepository.existsById(id)) {
            accommodation.setAccommodationId(id);
            return accommodationsRepository.save(accommodation);
        }
        return null;
    }

    @Override
    public void deleteAccommodation(Long id) {
        accommodationsRepository.deleteById(id);
    }
}

