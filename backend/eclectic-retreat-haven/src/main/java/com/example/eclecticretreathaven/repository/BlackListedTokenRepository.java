package com.example.eclecticretreathaven.repository;

import com.example.eclecticretreathaven.model.BlackListedToken;
import com.example.eclecticretreathaven.model.enums.TokenType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlackListedTokenRepository extends JpaRepository<BlackListedToken, Long> {
    boolean existsByTokenAndTokenType(String token, TokenType tokenType);
}