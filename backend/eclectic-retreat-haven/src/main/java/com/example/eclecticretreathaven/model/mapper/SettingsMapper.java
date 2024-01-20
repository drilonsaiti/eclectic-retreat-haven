package com.example.eclecticretreathaven.model.mapper;

import com.example.eclecticretreathaven.model.Settings;
import com.example.eclecticretreathaven.model.dto.SettingsDto;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SettingsMapper {

    public Settings mapDtoToEntity(SettingsDto dto, Settings settings) {
        Settings entity = (settings != null) ? settings : new Settings();
        entity.setCreatedAt(LocalDateTime.now());
        entity.setMinBookingLength(dto.getMinBookingLength());
        entity.setMaxBookingLength(dto.getMaxBookingLength());
        entity.setMaxGuestsPerBooking(dto.getMaxGuestsPerBooking());
        entity.setBreakfastPrice(dto.getBreakfastPrice());
        entity.setDinnerPrice(dto.getDinnerPrice());

        return entity;
    }
}
