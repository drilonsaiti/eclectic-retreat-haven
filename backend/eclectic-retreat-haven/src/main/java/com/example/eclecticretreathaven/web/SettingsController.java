package com.example.eclecticretreathaven.web;

import com.example.eclecticretreathaven.model.Settings;
import com.example.eclecticretreathaven.model.dto.SettingsDto;
import com.example.eclecticretreathaven.service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin
@RequiredArgsConstructor
public class SettingsController {

    private final SettingsService settingsService;

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
    public ResponseEntity<Settings> createSettings(@RequestBody SettingsDto settingsDto) {
        Settings createdSettings = settingsService.createSettings(settingsDto);
        return ResponseEntity.ok(createdSettings);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Settings> updateSettings(@PathVariable Long id, @RequestBody SettingsDto settingsDto) {
        Settings updatedSettings = settingsService.updateSettings(id, settingsDto);
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

