package com.example.eclecticretreathaven.service.impl;

import com.example.eclecticretreathaven.model.BlackListedToken;
import com.example.eclecticretreathaven.model.enums.TokenType;
import com.example.eclecticretreathaven.repository.BlackListedTokenRepository;
import com.example.eclecticretreathaven.service.BlackListedTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlackListedTokenServiceImpl implements BlackListedTokenService {

    private final BlackListedTokenRepository blacklistedTokenRepository;


    @Override
    public void blacklistToken(String token, TokenType tokenType) {
        BlackListedToken blacklistedToken = new BlackListedToken();
        blacklistedToken.setToken(token);
        blacklistedToken.setTokenType(tokenType);
        blacklistedTokenRepository.save(blacklistedToken);
    }

    @Override
    public boolean isTokenBlacklisted(String token, TokenType tokenType) {
        return blacklistedTokenRepository.existsByTokenAndTokenType(token, tokenType);
    }
}

