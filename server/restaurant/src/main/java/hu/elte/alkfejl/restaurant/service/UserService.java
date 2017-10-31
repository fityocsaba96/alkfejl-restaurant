package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.User;
import hu.elte.alkfejl.restaurant.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@Service
@SessionScope
@Data
public class UserService {

    private UserRepository userRepository;
    private User user;

    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String encodePassword(String password) {
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
}
