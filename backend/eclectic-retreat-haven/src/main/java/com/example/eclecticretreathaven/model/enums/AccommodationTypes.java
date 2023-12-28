package com.example.eclecticretreathaven.model.enums;

public enum AccommodationTypes {
    CABIN("Cabin"),
    VILLA("Villa"),
    CAVE_ROOM("Cave room");

    public final String label;
    AccommodationTypes(String label) {
        this.label = label;
    }
}
