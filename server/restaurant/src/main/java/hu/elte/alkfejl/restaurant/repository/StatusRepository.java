package hu.elte.alkfejl.restaurant.repository;

import hu.elte.alkfejl.restaurant.entity.Status;
import org.springframework.data.repository.CrudRepository;

public interface StatusRepository extends CrudRepository<Status, Long> {
}
