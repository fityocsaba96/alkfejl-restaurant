package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.OrderProduct;
import hu.elte.alkfejl.restaurant.entity.Product;
import hu.elte.alkfejl.restaurant.entity.Review;
import hu.elte.alkfejl.restaurant.repository.CategoryRepository;
import hu.elte.alkfejl.restaurant.repository.OrderProductRepository;
import hu.elte.alkfejl.restaurant.repository.ProductRepository;
import hu.elte.alkfejl.restaurant.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private OrderProductRepository orderProductRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public Iterable<Product> list() {
        return productRepository.findAll();
    }

    public Iterable<Product> listByCategory(Long id) {
        return productRepository.findAllByCategory_Id(id);
    }

    public Product addNewProduct(Product product){
        if(product.getCategory().getId()!=null){
            product.setCategory(categoryRepository.findOne(product.getCategory().getId()));
        }
        return productRepository.save(product);
    }

    public Product findOne(Long id) {
        return productRepository.findOne(id);
    }

    public void deleteProduct(Long id){
        Product deletedProduct=productRepository.findOne((long) 0);
        Product product=productRepository.findOne(id);
        if(product!=null && product.getId()!=0) {
            List<OrderProduct> orderProducts = orderProductRepository.findAllByProduct(product);
            for (OrderProduct orderProduct : orderProducts) {
                orderProduct.setProduct(deletedProduct);
            }
            productRepository.delete(id);
        }
    }
}
