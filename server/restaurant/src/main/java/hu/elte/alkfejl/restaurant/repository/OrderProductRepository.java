package hu.elte.alkfejl.restaurant.repository;

import hu.elte.alkfejl.restaurant.entity.Order;
import hu.elte.alkfejl.restaurant.entity.OrderProduct;
import hu.elte.alkfejl.restaurant.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderProductRepository extends CrudRepository<OrderProduct, Long> {
    List<OrderProduct> findAllByOrder(Order order);

    List<OrderProduct> findAllByProduct(Product product);
}
