package com.example.eclecticretreathaven.service;

import com.example.eclecticretreathaven.model.enums.TokenType;

public interface BlackListedTokenService {
    void blacklistToken(String token, TokenType tokenType);
    boolean isTokenBlacklisted(String token, TokenType tokenType);
}
