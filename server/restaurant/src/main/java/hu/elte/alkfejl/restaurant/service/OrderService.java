package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.*;
import hu.elte.alkfejl.restaurant.repository.OrderRepository;
import hu.elte.alkfejl.restaurant.request.OrderRequest;
import hu.elte.alkfejl.restaurant.response.OrderResponse;
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

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService,
                        OrderProductService orderProductService, StatusService statusService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.orderProductService = orderProductService;
        this.statusService = statusService;
    }

    public List<OrderResponse> listMyOwn() {
        List<Order> list = orderRepository.findAllByUser(userService.getUser());
        List<OrderResponse> listResponse = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();

        for (Order order : list) {
            OrderResponse orderResponse = modelMapper.map(order, OrderResponse.class);

            List<OrderProduct> orderProducts = orderProductService.listByOrder(order);
            Type listType = new TypeToken<List<OrderResponse.OrderProductResponse>>() {}.getType();
            orderResponse.setOrderProducts(modelMapper.map(orderProducts, listType));

            Short total = (short)orderProducts.stream().mapToInt(orderProduct -> orderProduct.getProduct().getPrice() * orderProduct.getQuantity()).sum();
            orderResponse.setTotal(total);

            listResponse.add(orderResponse);
        }
        return listResponse;
    }

    public boolean hasUserOrderedProduct(Long userId, Long productId) {
        return orderRepository.countByUserAndOrderProduct(userId, productId) != 0;
    }

    public Iterable<Order> listByOwnRestaurant(){
        List<User> usersInRestaurant = userService.findAllByRestaurant(userService.getUser().getRestaurant());
        List<Order> orders = new ArrayList<>();
        for (User user : usersInRestaurant) {
            orders.addAll(orderRepository.findAllByUser(user));
        }
        return orders;
    }

    public Order update(Long id, Order updatedOrder){
        Order currentOrder=orderRepository.findOne(id);
        Status newStatus = statusService.findOne(updatedOrder.getStatus().getId());
        if(newStatus!=null){
            currentOrder.setStatus(newStatus);
            return orderRepository.save(currentOrder);
        }
        throw new IllegalArgumentException();
    }

    public Order create(OrderRequest orderRequest) {
        if (orderRequest.getOrderProducts().isEmpty()) {
            throw new IllegalArgumentException();
        }
        assertUsersRestaurantIsOpen();

        ModelMapper modelMapper = new ModelMapper();
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

    private void assertUsersRestaurantIsOpen() {
        Restaurant restaurant = userService.getUser().getRestaurant();
        Calendar calendar = Calendar.getInstance();
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        int hourOfDay = calendar.get(Calendar.HOUR_OF_DAY);

        if (dayOfWeek == Calendar.SATURDAY || dayOfWeek == Calendar.SUNDAY) {
            if (restaurant.getOpenHourWeekend() > hourOfDay || restaurant.getCloseHourWeekend() <= hourOfDay) {
                throw new IllegalArgumentException();
            }
        } else {
            if (restaurant.getOpenHourWeekday() > hourOfDay || restaurant.getCloseHourWeekday() <= hourOfDay) {
                throw new IllegalArgumentException();
            }
        }
    }
}
