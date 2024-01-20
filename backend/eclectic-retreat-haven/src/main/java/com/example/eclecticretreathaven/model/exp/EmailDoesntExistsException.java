package com.example.eclecticretreathaven.model.exp;

public class EmailDoesntExistsException extends RuntimeException{
    public EmailDoesntExistsException() {
        super(String.format("Email doesn't exists"));
    }
}
