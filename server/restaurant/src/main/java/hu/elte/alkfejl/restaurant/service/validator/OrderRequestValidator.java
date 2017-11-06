package hu.elte.alkfejl.restaurant.service.validator;

import hu.elte.alkfejl.restaurant.entity.Restaurant;
import hu.elte.alkfejl.restaurant.entity.request.OrderRequest;
import hu.elte.alkfejl.restaurant.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Calendar;

@Component
public class OrderRequestValidator implements Validator {
    private UserService userService;

    @Autowired
    public OrderRequestValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return OrderRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        OrderRequest orderRequest = (OrderRequest) target;

        if (orderRequest.getOrderProducts().isEmpty()) {
            errors.rejectValue("orderProducts", "empty.order", "Cannot place empty order");
        }

        if (!isUsersRestaurantOpen()) {
            errors.reject("user.restaurant.closed", "Cannot place order while restaurant is closed");
        }
    }

    private boolean isUsersRestaurantOpen() {
        Restaurant restaurant = userService.getUser().getRestaurant();
        Calendar calendar = Calendar.getInstance();
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        int hourOfDay = calendar.get(Calendar.HOUR_OF_DAY);

        if (dayOfWeek == Calendar.SATURDAY || dayOfWeek == Calendar.SUNDAY) {
            if (restaurant.getOpenHourWeekend() > hourOfDay || restaurant.getCloseHourWeekend() <= hourOfDay) {
                return false;
            }
        } else {
            if (restaurant.getOpenHourWeekday() > hourOfDay || restaurant.getCloseHourWeekday() <= hourOfDay) {
                return false;
            }
        }
        return true;
    }
}