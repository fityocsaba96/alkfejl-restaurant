package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.Order;
import hu.elte.alkfejl.restaurant.entity.OrderProduct;
import hu.elte.alkfejl.restaurant.entity.Restaurant;
import hu.elte.alkfejl.restaurant.entity.User;
import hu.elte.alkfejl.restaurant.repository.OrderRepository;
import hu.elte.alkfejl.restaurant.repository.RestaurantRepository;
import hu.elte.alkfejl.restaurant.repository.UserRepository;
import hu.elte.alkfejl.restaurant.response.OrderResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private OrderRepository orderRepository;
    private UserService userService;
    private OrderProductService orderProductService;
    private UserRepository userRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService, OrderProductService orderProductService, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.orderProductService = orderProductService;
        this.userRepository=userRepository;
    }

    @Autowired
    private RestaurantRepository restaurantRepository;

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

    public Iterable<Order> listByRestaurant(Long id){
            Restaurant dbStroedRestaurant = restaurantRepository.findOne(id);
            List<User> usersInRestaurant = userRepository.findAllByRestaurant(dbStroedRestaurant);
            List<Order> orders = new ArrayList<>();
            for (User user : usersInRestaurant) {
                orders.addAll(orderRepository.findAllByUser(user));
            }
            return orders;
    }
}
