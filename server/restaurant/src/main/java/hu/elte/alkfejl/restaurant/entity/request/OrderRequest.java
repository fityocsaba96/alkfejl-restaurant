package hu.elte.alkfejl.restaurant.entity.request;

import hu.elte.alkfejl.restaurant.entity.Product;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
public class OrderRequest {

    @Size(max = 100, message = "Note cannot be longer than 100 characters")
    @NotNull
    private String note;

    @Valid
    @NotNull
    private List<OrderProductRequest> orderProducts;

    @Data
    public static class OrderProductRequest {

        @Min(value = 1, message = "Minimum quantity of order is 1")
        @NotNull
        private Byte quantity;

        @NotNull
        private Product product;
    }
}
