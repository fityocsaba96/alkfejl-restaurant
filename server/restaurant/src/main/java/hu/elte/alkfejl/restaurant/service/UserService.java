package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.Restaurant;
import hu.elte.alkfejl.restaurant.entity.User;
import hu.elte.alkfejl.restaurant.entity.request.LoginRequest;
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
    @Getter
    private User user;

    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean passwordMatches(String originalPassword, String encodedPassword) {
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

    public User register(User user) {
        return userRepository.save(secure(user));
    }

    private User secure(User user) {
        user.setId(null);
        user.setIsAdmin(false);
        user.setPasswordHash(encodePassword(user.getPasswordHash()));
        return user;
    }

    public User login(LoginRequest loginRequest) {
        return this.user = userRepository.findByEmail(loginRequest.getEmail());
    }

    public Boolean logout() {
        this.user = null;
        return true;
    }

    public List<User> findAllByRestaurant(Restaurant restaurant) {
        return userRepository.findAllByRestaurant(restaurant);
    }
}
