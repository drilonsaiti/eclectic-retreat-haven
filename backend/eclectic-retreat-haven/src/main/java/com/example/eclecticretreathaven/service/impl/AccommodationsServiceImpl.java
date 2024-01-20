package com.example.eclecticretreathaven.service.impl;

import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.model.dto.AccommodationsDto;
import com.example.eclecticretreathaven.model.mapper.AccommodationsMapper;
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
    private final AccommodationsMapper accommodationsMapper;

    @Override
    public List<Accommodations> getAllAccommodations() {
        return accommodationsRepository.findAll();
    }

    @Override
    public Accommodations getAccommodationById(Long id) {
        return accommodationsRepository.findById(id).orElse(null);
    }

    @Override
    public Accommodations createAccommodation(AccommodationsDto accommodationsDto) {
        return accommodationsRepository.save(accommodationsMapper.mapDtoToEntity(accommodationsDto,null));
    }

    @Override
    public Accommodations updateAccommodation(Long id, AccommodationsDto accommodationsDto) {
        if (accommodationsRepository.existsById(id)) {
            Accommodations accommodation = this.accommodationsRepository.findById(id).orElseThrow();

           accommodation = accommodationsMapper.mapDtoToEntity(accommodationsDto, accommodation);

            return accommodationsRepository.save(accommodation);
        }
        return null;
    }

    @Override
    public void deleteAccommodation(Long id) {
        accommodationsRepository.deleteById(id);
    }
}

