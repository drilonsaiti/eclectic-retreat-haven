package com.example.eclecticretreathaven.model.enums;

import org.springframework.security.core.GrantedAuthority;


public enum Role implements GrantedAuthority {

    ROLE_USER, ROLE_ADMIN,ROLE_EDITOR;

    @Override
    public String getAuthority() {
        return name();
    }
}
