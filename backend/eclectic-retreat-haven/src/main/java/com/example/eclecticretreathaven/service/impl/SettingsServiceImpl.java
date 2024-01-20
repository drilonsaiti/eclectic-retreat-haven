package com.example.eclecticretreathaven.service.impl;

import com.example.eclecticretreathaven.model.Settings;
import com.example.eclecticretreathaven.model.dto.SettingsDto;
import com.example.eclecticretreathaven.model.mapper.SettingsMapper;
import com.example.eclecticretreathaven.repository.SettingsRepository;
import com.example.eclecticretreathaven.service.SettingsService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class SettingsServiceImpl implements SettingsService {

    private final SettingsRepository settingsRepository;
    private final SettingsMapper settingsMapper;

    @Override
    public List<Settings> getAllSettings() {
        return settingsRepository.findAll();
    }

    @Override
    public Settings getSettingsById(Long id) {
        return settingsRepository.findById(id).orElse(null);
    }

    @Override
    public Settings createSettings(SettingsDto settingsDto) {
        return settingsRepository.save(settingsMapper.mapDtoToEntity(settingsDto,null));
    }

    @Override
    public Settings updateSettings(Long id, SettingsDto settingsDto) {
        if (settingsRepository.existsById(id)) {
            Settings settings = this.settingsRepository.findById(id).orElseThrow();

            settings = settingsMapper.mapDtoToEntity(settingsDto,settings);

            return settingsRepository.save(settings);
        }
        return null;
    }

    @Override
    public void deleteSettings(Long id) {
        settingsRepository.deleteById(id);
    }
}

