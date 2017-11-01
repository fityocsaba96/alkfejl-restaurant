package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.Category;
import hu.elte.alkfejl.restaurant.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Iterable<Category> list() {
        return categoryRepository.findAll();
    }
}
