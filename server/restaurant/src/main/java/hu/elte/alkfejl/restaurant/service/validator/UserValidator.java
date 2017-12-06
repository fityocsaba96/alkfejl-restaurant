package hu.elte.alkfejl.restaurant.service.validator;

import hu.elte.alkfejl.restaurant.entity.User;
import hu.elte.alkfejl.restaurant.repository.RestaurantRepository;
import hu.elte.alkfejl.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {
    private UserRepository userRepository;
    private RestaurantRepository restaurantRepository;

    @Autowired
    public UserValidator(RestaurantRepository restaurantRepository, UserRepository userRepository) {
        this.restaurantRepository = restaurantRepository;
        this.userRepository = userRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;

        User sameEmailUser = userRepository.findByEmail(user.getEmail());
        if (sameEmailUser != null && (user.getId() == null || !sameEmailUser.getId().equals(user.getId()))) {
            errors.rejectValue("email", "not.unique", "Email address already exists");
        }

        if (!restaurantRepository.findOne(user.getRestaurant().getId()).getCity().getId()
                .equals(user.getCity().getId())) {
            errors.rejectValue("restaurant", "user.city.different.than.restaurant.city", "Chosen restaurant must be in the same city as you");
        }
    }
}