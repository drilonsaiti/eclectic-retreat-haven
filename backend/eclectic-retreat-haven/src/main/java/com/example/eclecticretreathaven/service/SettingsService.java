package com.example.eclecticretreathaven.service;

import com.example.eclecticretreathaven.model.Settings;
import com.example.eclecticretreathaven.model.dto.SettingsDto;

import java.util.List;

public interface SettingsService {
    List<Settings> getAllSettings();
    Settings getSettingsById(Long id);
    Settings createSettings(SettingsDto settingsDto);
    Settings updateSettings(Long id, SettingsDto settingsDto);
    void deleteSettings(Long id);
}

