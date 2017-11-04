package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.Restaurant;
import hu.elte.alkfejl.restaurant.entity.User;
import hu.elte.alkfejl.restaurant.repository.UserRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.util.List;

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

    private void assertUserCitySameAsRestaurantCity(User user) {
        if (!restaurantService.findOne(user.getRestaurant().getId()).getCity().getId()
                .equals(user.getCity().getId())) {
            throw new IllegalArgumentException();
        }
    }

    public User update(User user) {
        assertUserCitySameAsRestaurantCity(user);
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
        assertUserCitySameAsRestaurantCity(user);
        this.user = userRepository.save(secure(user));
        return this.user;
    }

    private User secure(User user) {
        user.setId(null);
        user.setIsAdmin(false);
        user.setPasswordHash(encodePassword(user.getPasswordHash()));
        return user;
    }

    public User login(User user) {
        if (user.getPasswordHash() == null || user.getEmail() == null) {
            throw new IllegalArgumentException();
        }
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            User dbStoredUser = userRepository.findByEmail(user.getEmail()).get();
            if (passwordMatches(user.getPasswordHash(), dbStoredUser.getPasswordHash())) {
                return this.user = dbStoredUser;
            }
        }
        throw new IllegalArgumentException();
    }

    public List<User> findAllByRestaurant(Restaurant restaurant) {
        return userRepository.findAllByRestaurant(restaurant);
    }
}
