package com.example.eclecticretreathaven.service;

import com.example.eclecticretreathaven.model.User;
import com.example.eclecticretreathaven.model.dto.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;


import java.io.IOException;

import java.security.GeneralSecurityException;
import java.util.List;

public interface UserService extends UserDetailsService {

    User register( String fullName,String email,String password, String repeatPassword);

    List<UserUsernameDto> findAll();

    UserUsernameDto findUser(String token);

    UserProfileDto findUserProfile(String username);

    void changePassword(ChangePasswordDto change);

    void changeFullName(ChangeFullNameDto change);
    void changeAvatar(ChangeAvatarDto change);
    void changeEmail(ChangeEmailDto change);
    void forgetPassword(ForgotPassword dto);
    void deleteAccount(String token);

    UserDetails loadUserByEmail(String email);

    String extractEmail(String extractUsername);
    String getRoles(String extractUsername);
     /*void sendVerificationEmail(VerificationDto dto) throws MessagingException, IOException, GeneralSecurityException;*/

    void updateProfile(UpdateProfileDto dto);

}

