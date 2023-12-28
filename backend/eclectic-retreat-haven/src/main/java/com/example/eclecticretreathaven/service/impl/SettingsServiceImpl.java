package com.example.eclecticretreathaven.service.impl;

import com.example.eclecticretreathaven.model.Settings;
import com.example.eclecticretreathaven.repository.SettingsRepository;
import com.example.eclecticretreathaven.service.SettingsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor

public class SettingsServiceImpl implements SettingsService {

    private final SettingsRepository settingsRepository;

    @Override
    public List<Settings> getAllSettings() {
        return settingsRepository.findAll();
    }

    @Override
    public Settings getSettingsById(Long id) {
        return settingsRepository.findById(id).orElse(null);
    }

    @Override
    public Settings createSettings(Settings settings) {
        return settingsRepository.save(settings);
    }

    @Override
    public Settings updateSettings(Long id, Settings settings) {
        if (settingsRepository.existsById(id)) {
            settings.setSettingsId(id);
            return settingsRepository.save(settings);
        }
        return null;
    }

    @Override
    public void deleteSettings(Long id) {
        settingsRepository.deleteById(id);
    }
}

