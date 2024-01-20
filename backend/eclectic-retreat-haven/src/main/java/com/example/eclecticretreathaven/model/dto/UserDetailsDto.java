package com.example.eclecticretreathaven.model.dto;

import com.example.eclecticretreathaven.model.User;
import com.example.eclecticretreathaven.model.enums.Role;

import lombok.Data;

@Data
public class UserDetailsDto {
    private String email;
    private Role role;

    public static UserDetailsDto of(User user) {
        UserDetailsDto details = new UserDetailsDto();
        details.email = user.getEmail();
        details.role = user.getRole();
        return details;
    }
}