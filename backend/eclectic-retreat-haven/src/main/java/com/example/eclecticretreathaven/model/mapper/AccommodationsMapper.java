package com.example.eclecticretreathaven.model.mapper;

import com.example.eclecticretreathaven.model.Accommodations;
import com.example.eclecticretreathaven.model.dto.AccommodationsDto;
import com.example.eclecticretreathaven.model.enums.AccommodationTypes;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class AccommodationsMapper {

    public Accommodations mapDtoToEntity(AccommodationsDto dto,Accommodations acm) {
        Accommodations entity = (acm != null) ? acm : new Accommodations();
        entity.setName(dto.getName());
        entity.setMaxCapacity(dto.getMaxCapacity());
        entity.setRegularPrice(dto.getRegularPrice());
        entity.setDiscount(dto.getDiscount());
        entity.setDescription(dto.getDescription());
        entity.setImage(dto.getImage());
        entity.setTypes(AccommodationTypes.fromLabelIgnoreCase(dto.getTypes()));
        return entity;
    }
}
