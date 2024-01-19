package com.example.eclecticretreathaven.web;

import com.example.eclecticretreathaven.model.Guests;
import com.example.eclecticretreathaven.service.GuestsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
public class GuestsController {

    @Autowired
    private GuestsService guestsService;

    @GetMapping
    public List<Guests> getAllGuests() {
        return guestsService.getAllGuests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Guests> getGuestById(@PathVariable Long id) {
        Guests guest = guestsService.getGuestById(id);
        return ResponseEntity.ok(guest);
    }

    @PostMapping
    public ResponseEntity<Guests> createGuest(@RequestBody Guests guest) {
        Guests createdGuest = guestsService.createGuest(guest);
        return ResponseEntity.ok(createdGuest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Guests> updateGuest(@PathVariable Long id, @RequestBody Guests guest) {
        Guests updatedGuest = guestsService.updateGuest(id, guest);
        if (updatedGuest != null) {
            return ResponseEntity.ok(updatedGuest);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuest(@PathVariable Long id) {
        guestsService.deleteGuest(id);
        return ResponseEntity.noContent().build();
    }
}

