package com.example.eclecticretreathaven.config.auth;


import com.example.eclecticretreathaven.config.JwtService;
import com.example.eclecticretreathaven.model.User;
import com.example.eclecticretreathaven.model.enums.TokenType;
import com.example.eclecticretreathaven.model.exp.UserNotFoundException;
import com.example.eclecticretreathaven.repository.UserRepository;
import com.example.eclecticretreathaven.service.BlackListedTokenService;
import com.example.eclecticretreathaven.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final BlackListedTokenService blacklistedTokenService;

  private final UserService userService;

  public AuthenticationResponse register(RegisterRequest request) {
    User user = this.userService.register(request.getFullName(),request.getEmail(), request.getPassword(), request.getRepeatPassword());

    var jwtToken = jwtService.generateToken(user);
    var jwtRefreshToken = jwtService.generateRefreshToken(user);
    return AuthenticationResponse.builder()
            .token(jwtToken).refreshToken(jwtRefreshToken)
            .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) throws ServletException {

    UserDetails user = repository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UserNotFoundException(request.getEmail()));


    if (!passwordEncoder.matches(request.getPassword(),user.getPassword())){
      throw new BadCredentialsException("Password is incorrect");
    }
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );

    var jwtToken = jwtService.generateToken(user);
    System.out.println("JWT TOKEN: " + jwtToken);
    var jwtRefreshToken = jwtService.generateRefreshToken(user);


    return AuthenticationResponse.builder()
        .token(jwtToken).refreshToken(jwtRefreshToken)
        .build();
  }

  public void logout(String accessToken, String refreshToken) {
    if (accessToken != null && !blacklistedTokenService.isTokenBlacklisted(accessToken, TokenType.ACCESS)) {
      blacklistedTokenService.blacklistToken(accessToken, TokenType.ACCESS);
    }
    if (refreshToken != null && !blacklistedTokenService.isTokenBlacklisted(refreshToken, TokenType.REFRESH)) {
      blacklistedTokenService.blacklistToken(refreshToken, TokenType.REFRESH);
    }
  }

}
