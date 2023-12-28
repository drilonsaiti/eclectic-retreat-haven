package com.example.eclecticretreathaven.service;

import com.example.eclecticretreathaven.model.Settings;

import java.util.List;

public interface SettingsService {
    List<Settings> getAllSettings();
    Settings getSettingsById(Long id);
    Settings createSettings(Settings settings);
    Settings updateSettings(Long id, Settings settings);
    void deleteSettings(Long id);
}

