package hu.elte.alkfejl.restaurant.repository;

import hu.elte.alkfejl.restaurant.entity.Restaurant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant, Long> {

    List<Restaurant> findAllByCity_Id(Long id);
}
