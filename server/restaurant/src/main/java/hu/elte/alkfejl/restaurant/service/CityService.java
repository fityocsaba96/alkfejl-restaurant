package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.City;
import hu.elte.alkfejl.restaurant.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityService {

    private CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public Iterable<City> list() {
        return cityRepository.findAll();
    }
}
