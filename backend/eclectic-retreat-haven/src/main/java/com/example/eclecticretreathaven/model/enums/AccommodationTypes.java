package com.example.eclecticretreathaven.model.enums;

public enum AccommodationTypes {
    CABIN("Cabin"),
    VILLA("Villa"),
    CAVE_ROOM("Cave room");

    public final String label;
    AccommodationTypes(String label) {
        this.label = label;
    }

    public static AccommodationTypes fromLabelIgnoreCase(String label) {
        for (AccommodationTypes type : AccommodationTypes.values()) {
            if (type.label.equalsIgnoreCase(label)) {
                return type;
            }
        }
        throw new IllegalArgumentException("No constant with label " + label + " found");
    }
}
