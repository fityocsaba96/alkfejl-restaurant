package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.Product;
import hu.elte.alkfejl.restaurant.repository.CategoryRepository;
import hu.elte.alkfejl.restaurant.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Autowired
    private CategoryRepository categoryRepository;

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
}
