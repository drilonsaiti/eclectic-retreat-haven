package com.example.eclecticretreathaven.model.exp;

public class PasswordsDoNotMatchException extends RuntimeException{

    public PasswordsDoNotMatchException() {
        super("Passwords do not match.");
    }
}

