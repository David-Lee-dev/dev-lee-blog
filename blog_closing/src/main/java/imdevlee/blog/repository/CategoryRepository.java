package imdevlee.blog.repository;

import imdevlee.blog.domain.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository {
    Category save(Category category);
    void delete(Long id);

    Category findById(Long id);
    Category findByName(String name, String type);
    List<Category> findAll(String type);
}
