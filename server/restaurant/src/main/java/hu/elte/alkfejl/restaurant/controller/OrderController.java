package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.service.annotation.Role;
import hu.elte.alkfejl.restaurant.entity.Order;
import hu.elte.alkfejl.restaurant.entity.request.OrderRequest;
import hu.elte.alkfejl.restaurant.entity.response.OrderResponse;
import hu.elte.alkfejl.restaurant.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static hu.elte.alkfejl.restaurant.entity.User.Role.ADMIN;
import static hu.elte.alkfejl.restaurant.entity.User.Role.USER;

@RestController
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Role({ADMIN, USER})
    @GetMapping("/user/me/orders")
    private ResponseEntity<List<OrderResponse>> listMyOwn() {
        List<OrderResponse> list = orderService.listMyOwn();
        return ResponseEntity.ok(list);
    }

    @Role(ADMIN)
    @GetMapping("/orders/incoming")
    private ResponseEntity<Iterable<Order>> listByOwnRestaurant() {
        Iterable<Order> orders = orderService.listByOwnRestaurant();
        return ResponseEntity.ok(orders);
    }

    @Role(ADMIN)
    @PutMapping("/order/{id}")
    private ResponseEntity<Order> update(@PathVariable Long id, @RequestBody @Valid Order order) {
        try {
            Order updated = orderService.update(id, order);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Role(USER)
    @PostMapping("/order")
    private ResponseEntity<Order> create(@RequestBody @Valid OrderRequest orderRequest) {
        try {
            Order order = orderService.create(orderRequest);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
