package com.example.eclecticretreathaven.model.exp;

public class EmailAlreadyExistsException extends RuntimeException{
    public EmailAlreadyExistsException(String username) {
        super(String.format("User with email: %s already exists", username));
    }
}

