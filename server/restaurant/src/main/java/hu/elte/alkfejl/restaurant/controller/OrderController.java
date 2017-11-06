package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.service.annotation.Role;
import hu.elte.alkfejl.restaurant.entity.Order;
import hu.elte.alkfejl.restaurant.entity.request.OrderRequest;
import hu.elte.alkfejl.restaurant.entity.response.OrderResponse;
import hu.elte.alkfejl.restaurant.service.OrderService;
import hu.elte.alkfejl.restaurant.service.validator.OrderRequestValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static hu.elte.alkfejl.restaurant.entity.User.Role.ADMIN;
import static hu.elte.alkfejl.restaurant.entity.User.Role.USER;

@RestController
public class OrderController {

    private OrderService orderService;
    private OrderRequestValidator orderRequestValidator;

    @Autowired
    public OrderController(OrderService orderService, OrderRequestValidator orderRequestValidator) {
        this.orderService = orderService;
        this.orderRequestValidator = orderRequestValidator;
    }

    @InitBinder("orderRequest")
    public void setupOrderRequestValidator(WebDataBinder binder) {
        binder.addValidators(orderRequestValidator);
    }

    @Role({ADMIN, USER})
    @GetMapping("/user/me/orders")
    private ResponseEntity<List<OrderResponse>> listMyOwn() {
        return ResponseEntity.ok(orderService.listMyOwn());
    }

    @Role(ADMIN)
    @GetMapping("/orders/incoming")
    private ResponseEntity<Iterable<Order>> listByOwnRestaurant() {
        return ResponseEntity.ok(orderService.listByOwnRestaurant());
    }

    @Role(ADMIN)
    @PutMapping("/order/{id}")
    private ResponseEntity<Order> update(@PathVariable Long id, @RequestBody @Valid Order order) {
        return ResponseEntity.ok(orderService.update(id, order));
    }

    @Role(USER)
    @PostMapping("/order")
    private ResponseEntity<Order> create(@RequestBody @Valid OrderRequest orderRequest) {
        return ResponseEntity.ok(orderService.create(orderRequest));
    }
}
