package com.example.eclecticretreathaven.config;

import com.example.eclecticretreathaven.model.enums.TokenType;
import com.example.eclecticretreathaven.service.BlackListedTokenService;
import com.example.eclecticretreathaven.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserService userService;
  private final BlackListedTokenService blacklistedTokenService;

  @Override
  protected void doFilterInternal(
          @NonNull HttpServletRequest request,
          @NonNull HttpServletResponse response,
          @NonNull FilterChain filterChain
  ) throws ServletException, IOException {
    final String authHeader = request.getHeader("Authorization");
    final String jwt;
    final String email;

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    jwt = authHeader.substring(7);
    email = jwtService.extractUsername(jwt);

    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      UserDetails userDetails = this.userService.loadUserByUsername(email);
      if (jwtService.isTokenValid(jwt, userDetails)
              && (!blacklistedTokenService.isTokenBlacklisted(jwt, TokenType.ACCESS) ||
              !blacklistedTokenService.isTokenBlacklisted(jwt, TokenType.REFRESH))) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        authToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );
        request.getSession().setAttribute("username", email);
        SecurityContextHolder.getContext().setAuthentication(authToken);
      }
    }
    filterChain.doFilter(request, response);
  }
}
