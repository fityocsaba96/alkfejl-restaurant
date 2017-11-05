package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.Review;
import hu.elte.alkfejl.restaurant.repository.ReviewRepository;
import hu.elte.alkfejl.restaurant.entity.response.ReviewsResponse;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.List;

@Service
public class ReviewService {

    private ReviewRepository reviewRepository;
    private ProductService productService;
    private UserService userService;
    private OrderService orderService;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, ProductService productService,
                         UserService userService, OrderService orderService) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
        this.userService = userService;
        this.orderService = orderService;
    }

    public ReviewsResponse listByProduct(Long id) {
        ReviewsResponse reviewsResponse = new ReviewsResponse();
        reviewsResponse.setProduct(productService.findOne(id));

        List<Review> reviews = reviewRepository.findAllByProduct_Id(id);
        ModelMapper modelMapper = new ModelMapper();
        Type listType = new TypeToken<List<ReviewsResponse.ReviewResponse>>() {}.getType();
        List<ReviewsResponse.ReviewResponse> reviewResponses = modelMapper.map(reviews, listType);

        reviewsResponse.setReviews(reviewResponses);

        return reviewsResponse;
    }

    public Review create(Long productId, Review review) {
        if (!orderService.hasUserOrderedProduct(userService.getUser().getId(), productId)) {
            throw new IllegalArgumentException();
        }
        if (reviewRepository.countByUser_IdAndProduct_Id(userService.getUser().getId(), productId) != 0) {
            throw new IllegalArgumentException();
        }

        review.setCreateDate(new Timestamp(System.currentTimeMillis()));
        review.setUser(userService.getUser());
        review.setProduct(productService.findOne(productId));

        return reviewRepository.save(review);
    }
}
