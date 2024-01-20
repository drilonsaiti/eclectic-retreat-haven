package com.example.eclecticretreathaven.model.dto;

import lombok.Data;

@Data
public class ChangeFullNameDto {
    String token;
    String fullName;
    String password;
}
