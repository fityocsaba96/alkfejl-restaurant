package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.annotation.Role;
import hu.elte.alkfejl.restaurant.entity.Product;
import hu.elte.alkfejl.restaurant.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        Iterable<Product> list = productService.list();
        return ResponseEntity.ok(list);
    }

    @Role({ADMIN, USER})
    @GetMapping("/category/{id}/products")
    private ResponseEntity<Iterable<Product>> listByCategory(@PathVariable Long id) {
        Iterable<Product> list = productService.listByCategory(id);
        return ResponseEntity.ok(list);
    }

    @Role(ADMIN)
    @PostMapping("/products")
    private ResponseEntity<Product> addNewProduct(@RequestBody Product product){
        Product newProduct=productService.addNewProduct(product);
        return ResponseEntity.ok(newProduct);
    }
}
