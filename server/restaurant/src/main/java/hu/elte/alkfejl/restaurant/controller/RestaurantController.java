package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.service.annotation.Role;
import hu.elte.alkfejl.restaurant.entity.Restaurant;
import hu.elte.alkfejl.restaurant.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import static hu.elte.alkfejl.restaurant.entity.User.Role.ADMIN;
import static hu.elte.alkfejl.restaurant.entity.User.Role.GUEST;
import static hu.elte.alkfejl.restaurant.entity.User.Role.USER;

@RestController
public class RestaurantController {

    private RestaurantService restaurantService;

    @Autowired
    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @Role({ADMIN, USER, GUEST})
    @GetMapping("/city/{id}/restaurants")
    private ResponseEntity<Iterable<Restaurant>> listByCity(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.listByCity(id));
    }

    @Role({ADMIN, USER, GUEST})
    @GetMapping("/restaurants")
    private ResponseEntity<Iterable<Restaurant>> list() {
        return ResponseEntity.ok(restaurantService.list());
    }
}
