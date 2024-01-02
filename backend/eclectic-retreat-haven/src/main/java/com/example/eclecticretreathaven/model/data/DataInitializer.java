/*
package com.example.eclecticretreathaven.model.data;

import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.model.enums.AccommodationTypes;
import com.example.eclecticretreathaven.repository.AccommodationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class DataInitializer {

    private final AccommodationsRepository accommodationRepository;

    public DataInitializer(AccommodationsRepository accommodationRepository) {
        this.accommodationRepository = accommodationRepository;
    }

    @PostConstruct
    public void init() {
        // Insert data for each cabin
        insertCabin("Enchanted Hideaway", 2, 60, 0, "Escape to the intimate charm of Enchanted Hideaway...", "cabin_image_1.jpg", AccommodationTypes.CABIN);
        insertCabin("Whispering Pines Retreat", 4, 80, 0, "Discover the rustic elegance of Whispering Pines Retreat...", "cabin_image_2.jpg", AccommodationTypes.CABIN);
        insertCabin("Serenity Cove Cabin", 3, 70, 0, "Indulge in the allure of Serenity Cove Cabin...", "cabin_image_3.jpg", AccommodationTypes.CABIN);
        insertCabin("Cozy Nest Retreat", 2, 65, 0, "Experience the charm of Cozy Nest Retreat...", "cabin_image_4.jpg", AccommodationTypes.CABIN);
        insertCabin("Luxury Wilderness Lodge", 4, 85, 0, "Elevate your getaway at Luxury Wilderness Lodge...", "cabin_image_5.jpg", AccommodationTypes.CABIN);
        insertCabin("Tranquil Timber Haven", 3, 75, 0, "Step into the serenity of Tranquil Timber Haven...", "cabin_image_6.jpg", AccommodationTypes.CABIN);
        insertCabin("Mystic Moonlight Cabin", 2, 70, 0, "Discover the magic of Mystic Moonlight Cabin...", "cabin_image_7.jpg", AccommodationTypes.CABIN);
        insertCabin("Grand Pine Retreat", 4, 90, 0, "Embark on a journey of luxury at Grand Pine Retreat...", "cabin_image_8.jpg", AccommodationTypes.CABIN);

        System.out.println("Data inserted successfully.");
    }

    private void insertCabin(String name, int maxCapacity, int regularPrice, int discount, String description, String image, AccommodationTypes types) {
        Accommodations accommodation = new Accommodations();
        accommodation.setName(name);
        accommodation.setMaxCapacity(maxCapacity);
        accommodation.setRegularPrice(regularPrice);
        accommodation.setDiscount(discount);
        accommodation.setDescription(description);
        accommodation.setImage(image);
        accommodation.setTypes(types);

        // Save to the database using the repository
        this.accommodationRepository.save(accommodation);
    }
}
*/
