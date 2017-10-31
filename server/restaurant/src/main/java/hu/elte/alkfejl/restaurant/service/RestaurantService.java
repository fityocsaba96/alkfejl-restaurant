package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.Restaurant;
import hu.elte.alkfejl.restaurant.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {

    private RestaurantRepository restaurantRepository;

    @Autowired
    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public Iterable<Restaurant> listByCity(Long id) {
        return restaurantRepository.findAllByCity_Id(id);
    }

    public Restaurant findOne(Long id) {
        return restaurantRepository.findOne(id);
    }
}
