package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.annotation.Role;
import hu.elte.alkfejl.restaurant.entity.Review;
import hu.elte.alkfejl.restaurant.response.ReviewsResponse;
import hu.elte.alkfejl.restaurant.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static hu.elte.alkfejl.restaurant.entity.User.Role.ADMIN;
import static hu.elte.alkfejl.restaurant.entity.User.Role.USER;

@RestController
public class ReviewController {

    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @Role({ADMIN, USER})
    @GetMapping("/product/{id}/reviews")
    private ResponseEntity<ReviewsResponse> listByProduct(@PathVariable Long id) {
        ReviewsResponse reviews = reviewService.listByProduct(id);
        return ResponseEntity.ok(reviews);
    }

    @Role(USER)
    @PostMapping("/product/{id}/review")
    private ResponseEntity<Review> create(@PathVariable Long id, @RequestBody @Valid Review review) {
        try {
            Review createdReview = reviewService.create(id, review);
            return ResponseEntity.ok(createdReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
