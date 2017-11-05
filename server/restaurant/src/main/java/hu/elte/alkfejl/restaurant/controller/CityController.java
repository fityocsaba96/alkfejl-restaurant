package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.service.annotation.Role;
import hu.elte.alkfejl.restaurant.entity.City;
import hu.elte.alkfejl.restaurant.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static hu.elte.alkfejl.restaurant.entity.User.Role.ADMIN;
import static hu.elte.alkfejl.restaurant.entity.User.Role.GUEST;
import static hu.elte.alkfejl.restaurant.entity.User.Role.USER;

@RestController
public class CityController {

    private CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @Role({ADMIN, USER, GUEST})
    @GetMapping("/cities")
    private ResponseEntity<Iterable<City>> list() {
        Iterable<City> list = cityService.list();
        return ResponseEntity.ok(list);
    }
}
