package hu.elte.alkfejl.restaurant.repository;

import hu.elte.alkfejl.restaurant.entity.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository<City, Long> {
}
