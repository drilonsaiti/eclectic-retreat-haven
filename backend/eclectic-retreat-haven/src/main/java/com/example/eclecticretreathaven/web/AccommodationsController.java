package com.example.eclecticretreathaven.web;

import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.model.dto.AccommodationsDto;
import com.example.eclecticretreathaven.model.enums.AccommodationTypes;
import com.example.eclecticretreathaven.service.AccommodationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/accommodations")
@RequiredArgsConstructor
@CrossOrigin
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
    public ResponseEntity<Accommodations> createAccommodation(@RequestBody AccommodationsDto accommodationsDto) {

        Accommodations createdAccommodation = accommodationsService.createAccommodation(accommodationsDto);
        return ResponseEntity.ok(createdAccommodation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Accommodations> updateAccommodation(@PathVariable Long id, @RequestBody AccommodationsDto accommodationsDto) {
        Accommodations updatedAccommodation = accommodationsService.updateAccommodation(id, accommodationsDto);
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

    @GetMapping("/types")
    public ResponseEntity<List<String>> getAccommodationTypes() {
        List<String> types = Arrays.stream(AccommodationTypes.values()).map(type -> type.label).toList();
        return ResponseEntity.ok(types);
    }
}

