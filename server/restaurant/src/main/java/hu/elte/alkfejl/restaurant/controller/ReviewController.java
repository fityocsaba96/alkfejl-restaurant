package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.entity.Product;
import hu.elte.alkfejl.restaurant.entity.response.ErrorResponse;
import hu.elte.alkfejl.restaurant.service.annotation.Role;
import hu.elte.alkfejl.restaurant.entity.Review;
import hu.elte.alkfejl.restaurant.entity.response.ReviewsResponse;
import hu.elte.alkfejl.restaurant.service.ReviewService;
import hu.elte.alkfejl.restaurant.service.validator.ReviewValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static hu.elte.alkfejl.restaurant.entity.User.Role.ADMIN;
import static hu.elte.alkfejl.restaurant.entity.User.Role.USER;

@RestController
public class ReviewController {

    private ReviewService reviewService;
    private ReviewValidator reviewValidator;

    @Autowired
    public ReviewController(ReviewService reviewService, ReviewValidator reviewValidator) {
        this.reviewService = reviewService;
        this.reviewValidator = reviewValidator;
    }

    @Role({ADMIN, USER})
    @GetMapping("/product/{id}/reviews")
    private ResponseEntity<ReviewsResponse> listByProduct(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.listByProduct(id));
    }

    @Role(USER)
    @PostMapping("/product/{id}/review")
    private ResponseEntity create(@PathVariable Long id, @RequestBody @Valid Review review, BindingResult bindingResult)
            throws NoSuchMethodException, MethodArgumentNotValidException {
        Product product = new Product();
        product.setId(id);
        review.setProduct(product);

        reviewValidator.validate(review, bindingResult);
        if (bindingResult.hasErrors()) {
            throw new MethodArgumentNotValidException(new MethodParameter(this.getClass().getDeclaredMethod
                    ("create", Long.class, Review.class, BindingResult.class), 1), bindingResult);
        } else {
            return ResponseEntity.ok(reviewService.create(id, review));
        }
    }
}
