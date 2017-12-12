package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.*;
import hu.elte.alkfejl.restaurant.repository.OrderRepository;
import hu.elte.alkfejl.restaurant.entity.request.OrderRequest;
import hu.elte.alkfejl.restaurant.entity.response.OrderResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class OrderService {

    private OrderRepository orderRepository;
    private UserService userService;
    private OrderProductService orderProductService;
    private StatusService statusService;
    private ModelMapper modelMapper;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService,
                        OrderProductService orderProductService, StatusService statusService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.orderProductService = orderProductService;
        this.statusService = statusService;
        this.modelMapper = new ModelMapper();
    }

    public List<Order> listMyOwn() {
        List<Order> orderList = orderRepository.findAllByUser(userService.getUser());
        return orderList;
    }

    public boolean hasUserOrderedProduct(Long userId, Long productId) {
        return orderRepository.countByUserAndOrderProduct(userId, productId) != 0;
    }

    public List<Order> listByOwnRestaurant() {
        List<User> usersInRestaurant = userService.findAllByRestaurant(userService.getUser().getRestaurant());
        List<Order> listResponse = new ArrayList<>();

        for (User user : usersInRestaurant) {
            listResponse.addAll(orderRepository.findAllByUser(user));
        }
        return listResponse;
    }

    private OrderResponse orderToOrderResponse(Order order) {
        OrderResponse orderResponse = modelMapper.map(order, OrderResponse.class);

        List<OrderProduct> orderProducts = orderProductService.listByOrder(order);
        Type listType = new TypeToken<List<OrderResponse.OrderProductResponse>>() {}.getType();
        orderResponse.setOrderProducts(modelMapper.map(orderProducts, listType));

        Short total = (short) orderProducts.stream().mapToInt(orderProduct -> orderProduct.getProduct().getPrice() * orderProduct.getQuantity()).sum();
        orderResponse.setTotal(total);

        return orderResponse;
    }

    public OrderResponse getById(Long id) {
        Order order = orderRepository.findById(id);
        return orderToOrderResponse(order);
    }

    public Order update(Long id, Order updatedOrder) {
        Order currentOrder = orderRepository.findOne(id);
        currentOrder.setStatus(statusService.findOne(updatedOrder.getStatus().getId()));
        return orderRepository.save(currentOrder);
    }

    public Order create(OrderRequest orderRequest) {
        Order order = modelMapper.map(orderRequest, Order.class);
        order.setCreateDate(new Timestamp(System.currentTimeMillis()));
        order.setUser(userService.getUser());
        Status status = new Status();
        status.setId(1L);
        order.setStatus(status);

        order = orderRepository.save(order);

        Type listType = new TypeToken<List<OrderProduct>>() {}.getType();
        List<OrderProduct> orderProducts = modelMapper.map(orderRequest.getOrderProducts(), listType);
        for (OrderProduct orderProduct : orderProducts) {
            orderProduct.setOrder(order);
        }

        orderProductService.save(orderProducts);

        return order;
    }
}
