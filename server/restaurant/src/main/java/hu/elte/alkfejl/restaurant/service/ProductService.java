package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.OrderProduct;
import hu.elte.alkfejl.restaurant.entity.Product;
import hu.elte.alkfejl.restaurant.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private ProductRepository productRepository;
    private CategoryService categoryService;
    private OrderProductService orderProductService;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryService categoryService,
                          OrderProductService orderProductService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.orderProductService = orderProductService;
    }

    public Iterable<Product> list() {
        return productRepository.findAllByIdIsNot(0L);
    }

    public Iterable<Product> listByCategory(Long id) {
        return productRepository.findAllByCategory_Id(id);
    }

    public Product addNewProduct(Product product) {
        if (product.getCategory().getId() != null) {
            product.setCategory(categoryService.findOne(product.getCategory().getId()));
        }
        return productRepository.save(product);
    }

    public Product findOne(Long id) {
        return productRepository.findOne(id);
    }

    public void deleteProduct(Long id) {
        Product deletedProduct = productRepository.findOne((long) 0);
        Product product = productRepository.findOne(id);
        if (product != null && product.getId() != 0) {
            List<OrderProduct> orderProducts = orderProductService.findAllByProduct(product);
            for (OrderProduct orderProduct : orderProducts) {
                orderProduct.setProduct(deletedProduct);
            }
            productRepository.delete(id);
        } else {
            throw new IllegalArgumentException();
        }
    }
}
