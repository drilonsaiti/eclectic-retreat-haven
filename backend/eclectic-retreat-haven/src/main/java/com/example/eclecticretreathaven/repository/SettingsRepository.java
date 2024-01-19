package com.example.eclecticretreathaven.repository;

import com.example.eclecticretreathaven.model.Settings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsRepository extends JpaRepository<Settings, Long> {
    // You can add custom queries if needed
}
