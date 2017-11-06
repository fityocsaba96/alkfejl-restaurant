package hu.elte.alkfejl.restaurant.service.validator;

import hu.elte.alkfejl.restaurant.entity.User;
import hu.elte.alkfejl.restaurant.entity.request.LoginRequest;
import hu.elte.alkfejl.restaurant.repository.UserRepository;
import hu.elte.alkfejl.restaurant.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class LoginRequestValidator implements Validator {
    private UserRepository userRepository;
    private UserService userService;

    @Autowired
    public LoginRequestValidator(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return LoginRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        LoginRequest loginRequest = (LoginRequest) target;

        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null) {
            errors.rejectValue("email", "not.exists", "Email address does not exist");
        }

        else if (!userService.passwordMatches(loginRequest.getPassword(), user.getPasswordHash())) {
            errors.rejectValue("password", "not.matches.password", "Incorrect password");
        }
    }
}