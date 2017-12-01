package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.entity.response.ErrorResponse;
import hu.elte.alkfejl.restaurant.service.annotation.Role;
import hu.elte.alkfejl.restaurant.entity.Product;
import hu.elte.alkfejl.restaurant.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static hu.elte.alkfejl.restaurant.entity.User.Role.ADMIN;
import static hu.elte.alkfejl.restaurant.entity.User.Role.USER;

@RestController
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Role({ADMIN, USER})
    @GetMapping("/products")
    private ResponseEntity<Iterable<Product>> list() {
        return ResponseEntity.ok(productService.list());
    }

    @Role({ADMIN, USER})
    @GetMapping("/category/{id}/products")
    private ResponseEntity<Iterable<Product>> listByCategory(@PathVariable Long id) {
        return ResponseEntity.ok(productService.listByCategory(id));
    }

    @Role(ADMIN)
    @PostMapping("/products")
    private ResponseEntity<Product> addNewProduct(@RequestBody @Valid Product product) {
        return ResponseEntity.ok(productService.addNewProduct(product));
    }

    @Role(ADMIN)
    @DeleteMapping("/product/{id}")
    private ResponseEntity delete(@PathVariable Long id) {
        if (id == 0) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Cannot delete the deleted product"));
        } else {
            productService.deleteProduct(id);
            return ResponseEntity.ok(true);
        }
    }
}
