package com.example.eclecticretreathaven.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserProfileDto {

    String email;
    String profileImage;
    String fullName;
}
