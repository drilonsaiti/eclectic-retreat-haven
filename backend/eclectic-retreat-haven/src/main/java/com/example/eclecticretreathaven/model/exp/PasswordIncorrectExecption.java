package com.example.eclecticretreathaven.model.exp;

public class PasswordIncorrectExecption extends RuntimeException{

    public PasswordIncorrectExecption() {
        super("Password incorrect.");
    }
}