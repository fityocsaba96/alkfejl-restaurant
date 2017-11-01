package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.User;
import hu.elte.alkfejl.restaurant.repository.CityRepository;
import hu.elte.alkfejl.restaurant.repository.RestaurantRepository;
import hu.elte.alkfejl.restaurant.repository.UserRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@Service
@SessionScope
public class UserService {

    private UserRepository userRepository;
    private RestaurantService restaurantService;
    @Getter
    private User user;

    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, RestaurantService restaurantService) {
        this.userRepository = userRepository;
        this.restaurantService = restaurantService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private CityRepository cityRepository;

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    private boolean passwordMatches(String originalPassword, String encodedPassword) {
        return passwordEncoder.matches(originalPassword, encodedPassword);
    }

    public User.Role getRole() {
        return user.getIsAdmin() ? User.Role.ADMIN : User.Role.USER;
    }

    public boolean isLoggedIn() {
        return user != null;
    }

    public User read() {
        return user;
    }

    public User update(User user) {
        if (!restaurantService.findOne(user.getRestaurant().getId()).getCity().getId()
                .equals(user.getCity().getId())) {
            throw new IllegalArgumentException();
        }

        User updated = userRepository.save(restore(user));
        this.user = updated;
        return updated;
    }

    private User restore(User user) {
        user.setId(this.user.getId());
        user.setIsAdmin(this.user.getIsAdmin());
        user.setPasswordHash(encodePassword(user.getPasswordHash()));
        return user;
    }

    public User register(User user){
        user.setPasswordHash(encodePassword(user.getPasswordHash()));
        user.setRestaurant(restaurantRepository.findOne(user.getRestaurant().getId()));
        user.setCity(cityRepository.findOne(user.getCity().getId()));
        this.user=userRepository.save(user);
        return user;
    }
}
