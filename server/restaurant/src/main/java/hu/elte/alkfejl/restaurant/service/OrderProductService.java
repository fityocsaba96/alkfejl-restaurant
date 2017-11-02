package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.Order;
import hu.elte.alkfejl.restaurant.entity.OrderProduct;
import hu.elte.alkfejl.restaurant.repository.OrderProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderProductService {

    private OrderProductRepository orderProductRepository;

    @Autowired
    public OrderProductService(OrderProductRepository orderProductRepository) {
        this.orderProductRepository = orderProductRepository;
    }

    public List<OrderProduct> listByOrder(Order order) {
        return orderProductRepository.findAllByOrder(order);
    }

    public Iterable<OrderProduct> save(Iterable<OrderProduct> orderProducts) {
        return orderProductRepository.save(orderProducts);
    }
}
