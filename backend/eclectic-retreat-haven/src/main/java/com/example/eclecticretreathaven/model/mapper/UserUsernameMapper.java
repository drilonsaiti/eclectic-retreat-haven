package com.example.eclecticretreathaven.model.mapper;


import com.example.eclecticretreathaven.model.User;
import com.example.eclecticretreathaven.model.dto.UserUsernameDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserUsernameMapper implements Function<User, UserUsernameDto> {
    @Override
    public UserUsernameDto apply(User u) {

        return new UserUsernameDto(
                u.getUsername(),
                u.getImageUrl()
        );
    }
}
