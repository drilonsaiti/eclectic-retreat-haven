package com.example.eclecticretreathaven.web;

import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.service.AccommodationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
@RequiredArgsConstructor
public class AccommodationsController {


    private final AccommodationsService accommodationsService;

    @GetMapping
    public List<Accommodations> getAllAccommodations() {
        return accommodationsService.getAllAccommodations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accommodations> getAccommodationById(@PathVariable Long id) {
        Accommodations accommodation = accommodationsService.getAccommodationById(id);
        return ResponseEntity.ok(accommodation);
    }

    @PostMapping
    public ResponseEntity<Accommodations> createAccommodation(@RequestBody Accommodations accommodation) {
        Accommodations createdAccommodation = accommodationsService.createAccommodation(accommodation);
        return ResponseEntity.ok(createdAccommodation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Accommodations> updateAccommodation(@PathVariable Long id, @RequestBody Accommodations accommodation) {
        Accommodations updatedAccommodation = accommodationsService.updateAccommodation(id, accommodation);
        if (updatedAccommodation != null) {
            return ResponseEntity.ok(updatedAccommodation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccommodation(@PathVariable Long id) {
        accommodationsService.deleteAccommodation(id);
        return ResponseEntity.noContent().build();
    }
}

