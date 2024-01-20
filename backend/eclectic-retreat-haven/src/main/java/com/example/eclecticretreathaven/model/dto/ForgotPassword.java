package com.example.eclecticretreathaven.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ForgotPassword {
    String token;
    String email;
    String newPassword;
    String repeatedPassword;
    String verifyCode;

}