package hu.elte.alkfejl.restaurant.repository;

import hu.elte.alkfejl.restaurant.entity.Product;
import hu.elte.alkfejl.restaurant.entity.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Long> {

    List<Review> findAllByProduct_Id(Long id);

    int countByUser_IdAndProduct_Id(Long userId, Long productId);
}
