package hu.elte.alkfejl.restaurant.entity.response;

import hu.elte.alkfejl.restaurant.entity.Product;
import hu.elte.alkfejl.restaurant.entity.Status;
import hu.elte.alkfejl.restaurant.entity.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Timestamp;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderResponse extends BaseResponse {

    private Timestamp createDate;

    private String note;

    private User user;

    private Status status;

    private List<OrderProductResponse> orderProducts;

    private Short total;

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class OrderProductResponse extends BaseResponse {

        private Byte quantity;

        private Product product;
    }
}
