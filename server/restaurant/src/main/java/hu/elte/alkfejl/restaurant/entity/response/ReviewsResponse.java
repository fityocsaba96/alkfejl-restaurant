package hu.elte.alkfejl.restaurant.entity.response;

import hu.elte.alkfejl.restaurant.entity.Product;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Timestamp;
import java.util.List;

@Data
@EqualsAndHashCode
public class ReviewsResponse {

    private Product product;

    private List<ReviewResponse> reviews;

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class ReviewResponse extends BaseResponse {

        private Timestamp createDate;

        private Byte stars;

        private String description;

        private String userFirstName;

        private String userLastName;
    }
}
