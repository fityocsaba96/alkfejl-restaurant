package hu.elte.alkfejl.restaurant.repository;

import hu.elte.alkfejl.restaurant.entity.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {

    Iterable<Category> findAllByIdIsNot(Long id);
}
