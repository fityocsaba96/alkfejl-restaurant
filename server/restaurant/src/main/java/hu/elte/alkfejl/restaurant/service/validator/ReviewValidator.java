package hu.elte.alkfejl.restaurant.service.validator;

import hu.elte.alkfejl.restaurant.entity.Review;
import hu.elte.alkfejl.restaurant.repository.ReviewRepository;
import hu.elte.alkfejl.restaurant.service.OrderService;
import hu.elte.alkfejl.restaurant.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class ReviewValidator implements Validator {
    private UserService userService;
    private OrderService orderService;
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewValidator(UserService userService, OrderService orderService, ReviewRepository reviewRepository) {
        this.userService = userService;
        this.orderService = orderService;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return Review.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Review review = (Review) target;

        if (!orderService.hasUserOrderedProduct(userService.getUser().getId(), review.getProduct().getId())) {
            errors.reject("user.did.not.order.product", "Cannot leave review, because you did not order this product");
        }

        else if (reviewRepository.countByUser_IdAndProduct_Id(userService.getUser().getId(), review.getProduct().getId()) != 0) {
            errors.reject("user.already.reviewed", "You have already reviewed this product");
        }
    }
}