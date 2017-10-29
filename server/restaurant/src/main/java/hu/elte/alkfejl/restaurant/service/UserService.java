package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.User;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

@Service
@Data
@SessionScope
public class UserService {

    //@Autowired
    //private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private User user;

    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean passwordMatches(String originalPassword, String encodedPassword) {
        return passwordEncoder.matches(originalPassword, encodedPassword);
    }
}
