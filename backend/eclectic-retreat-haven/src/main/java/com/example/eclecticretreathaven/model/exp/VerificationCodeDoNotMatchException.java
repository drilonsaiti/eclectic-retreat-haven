package com.example.eclecticretreathaven.model.exp;

public class VerificationCodeDoNotMatchException extends RuntimeException{

    public VerificationCodeDoNotMatchException() {
        super("Verification code do not match.");
    }
}
