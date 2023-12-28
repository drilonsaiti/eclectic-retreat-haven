package com.example.eclecticretreathaven.web;

import com.example.eclecticretreathaven.model.Settings;
import com.example.eclecticretreathaven.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    @GetMapping
    public List<Settings> getAllSettings() {
        return settingsService.getAllSettings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Settings> getSettingsById(@PathVariable Long id) {
        Settings settings = settingsService.getSettingsById(id);
        return ResponseEntity.ok(settings);
    }

    @PostMapping
    public ResponseEntity<Settings> createSettings(@RequestBody Settings settings) {
        Settings createdSettings = settingsService.createSettings(settings);
        return ResponseEntity.ok(createdSettings);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Settings> updateSettings(@PathVariable Long id, @RequestBody Settings settings) {
        Settings updatedSettings = settingsService.updateSettings(id, settings);
        if (updatedSettings != null) {
            return ResponseEntity.ok(updatedSettings);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSettings(@PathVariable Long id) {
        settingsService.deleteSettings(id);
        return ResponseEntity.noContent().build();
    }
}

