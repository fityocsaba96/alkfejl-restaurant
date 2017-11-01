package hu.elte.alkfejl.restaurant.repository;

import hu.elte.alkfejl.restaurant.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {


}