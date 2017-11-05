package hu.elte.alkfejl.restaurant.repository;

import hu.elte.alkfejl.restaurant.entity.Order;
import hu.elte.alkfejl.restaurant.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {

    List<Order> findAllByUser(User user);

    @Query(value = "SELECT COUNT (*) FROM \"order\" O, ORDER_PRODUCT OP WHERE O.ID=OP.\"order_id\" AND USER_ID=?1 AND PRODUCT_ID=?2",
            nativeQuery = true)
    int countByUserAndOrderProduct(Long userId, Long productId);
}
