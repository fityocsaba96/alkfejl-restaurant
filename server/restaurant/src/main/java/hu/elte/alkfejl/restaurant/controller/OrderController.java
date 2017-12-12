package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.service.UserService;
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
    private UserService userService;
    private OrderRequestValidator orderRequestValidator;

    @Autowired
    public OrderController(OrderService orderService, UserService userService, OrderRequestValidator orderRequestValidator) {
        this.orderService = orderService;
        this.userService = userService;
        this.orderRequestValidator = orderRequestValidator;
    }

    @InitBinder("orderRequest")
    public void setupOrderRequestValidator(WebDataBinder binder) {
        binder.addValidators(orderRequestValidator);
    }

    @Role(USER)
    @GetMapping("/user/me/orders")
    private ResponseEntity<List<Order>> listMyOwn() {
        return ResponseEntity.ok(orderService.listMyOwn());
    }

    @Role(ADMIN)
    @GetMapping("/orders/incoming")
    private ResponseEntity<List<Order>> listByOwnRestaurant() {
        return ResponseEntity.ok(orderService.listByOwnRestaurant());
    }

    @Role({ADMIN, USER})
    @GetMapping("/order/{id}")
    private ResponseEntity<OrderResponse> getById(@PathVariable Long id) {
        OrderResponse orderResponse = orderService.getById(id);
        if (userService.getRole().equals(USER) && !orderResponse.getUser().getId().equals(userService.getUser().getId())) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(orderResponse);
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
